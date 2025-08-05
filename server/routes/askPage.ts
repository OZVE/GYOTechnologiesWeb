import { Request, Response } from 'express';
import OpenAI from 'openai';

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiting simple (1 request per 2 seconds per IP)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 2000; // 2 segundos

interface AskPageRequest {
  question: string;
  pageContext: string;
  url: string;
}

export async function askPageHandler(req: Request, res: Response) {
  try {
    // Validar método HTTP
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método no permitido' });
    }

    // Rate limiting
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const lastRequest = rateLimitMap.get(clientIP);
    
    if (lastRequest && (now - lastRequest) < RATE_LIMIT_WINDOW) {
      return res.status(429).json({ 
        error: 'Demasiadas solicitudes. Por favor espera 2 segundos antes de hacer otra pregunta.' 
      });
    }
    
    rateLimitMap.set(clientIP, now);

    // Validar body
    const { question, pageContext, url }: AskPageRequest = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'La pregunta es requerida y debe ser una cadena de texto' });
    }

    if (question.trim().length === 0) {
      return res.status(400).json({ error: 'La pregunta no puede estar vacía' });
    }

    if (question.length > 1000) {
      return res.status(400).json({ error: 'La pregunta es demasiado larga (máximo 1000 caracteres)' });
    }

    if (!pageContext || typeof pageContext !== 'string') {
      return res.status(400).json({ error: 'El contexto de la página es requerido' });
    }

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'La URL es requerida' });
    }

    // Validar API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY no está configurada');
      return res.status(500).json({ error: 'Error de configuración del servidor' });
    }

    // Preparar el prompt para OpenAI
    const systemPrompt = `Responde SOLO con la información provista en CONTEXTO. Si algo no está en el contexto, dilo explícitamente. Sé conciso y en español.

CONTEXTO DE LA PÁGINA:
${pageContext}

PREGUNTA DEL USUARIO: ${question}

INSTRUCCIONES:
- Responde únicamente basándote en la información del contexto proporcionado
- Si la información no está disponible en el contexto, indícalo claramente
- Mantén las respuestas concisas y en español
- No inventes información que no esté en el contexto
- Si la pregunta no es clara, pide aclaración`;

    // Llamar a OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        }
      ],
      max_tokens: 500,
      temperature: 0.3,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const answer = completion.choices[0]?.message?.content?.trim();

    if (!answer) {
      return res.status(500).json({ error: 'No se pudo generar una respuesta' });
    }

    // Limpiar rate limit map periódicamente (cada 5 minutos)
    if (Math.random() < 0.01) { // 1% de probabilidad en cada request
      const cutoff = now - (5 * 60 * 1000); // 5 minutos
      for (const [ip, timestamp] of rateLimitMap.entries()) {
        if (timestamp < cutoff) {
          rateLimitMap.delete(ip);
        }
      }
    }

    // Devolver respuesta
    res.status(200).json({ 
      answer,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en askPageHandler:', error);
    
    // Manejar errores específicos de OpenAI
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return res.status(500).json({ error: 'Error de autenticación con OpenAI' });
      } else if (error.status === 429) {
        return res.status(429).json({ error: 'Límite de rate excedido en OpenAI' });
      } else if (error.status === 400) {
        return res.status(400).json({ error: 'Solicitud inválida a OpenAI' });
      }
    }
    
    // Error genérico
    res.status(500).json({ error: 'Error interno del servidor' });
  }
} 