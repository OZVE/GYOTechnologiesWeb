import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ChevronUp } from 'lucide-react';
import { getPageContext } from '../lib/getPageContext';

// Función para formatear el texto de las respuestas
const formatAnswer = (text: string): JSX.Element[] => {
  if (!text) return [];
  
  // Dividir el texto en párrafos
  const paragraphs = text.split('\n').filter(p => p.trim());
  
  return paragraphs.map((paragraph, index) => {
    // Detectar títulos (líneas que terminan con :)
    if (paragraph.endsWith(':') && paragraph.length < 50) {
      return (
        <h4 key={index} className="font-semibold text-gray-900 text-sm mb-2 mt-4 first:mt-0">
          {paragraph}
        </h4>
      );
    }
    
    // Detectar listas numeradas (1., 2., etc.)
    if (/^\d+\.\s/.test(paragraph)) {
      return (
        <div key={index} className="flex items-start gap-2 mb-2">
          <span className="text-purple-600 font-semibold text-sm min-w-[20px] flex-shrink-0">
            {paragraph.match(/^\d+/)?.[0]}.
          </span>
          <span className="text-gray-800 text-sm leading-relaxed">
            {formatInlineText(paragraph.replace(/^\d+\.\s/, ''))}
          </span>
        </div>
      );
    }
    
    // Detectar listas con viñetas (- o •)
    if (/^[-•]\s/.test(paragraph)) {
      return (
        <div key={index} className="flex items-start gap-2 mb-2">
          <span className="text-purple-600 text-sm mt-1 flex-shrink-0">•</span>
          <span className="text-gray-800 text-sm leading-relaxed">
            {formatInlineText(paragraph.replace(/^[-•]\s/, ''))}
          </span>
        </div>
      );
    }
    
    // Párrafos normales con formateo inline
    return (
      <p key={index} className="text-gray-800 text-sm leading-relaxed mb-3">
        {formatInlineText(paragraph)}
      </p>
    );
  });
};

// Función para formatear texto inline (negrita, enlaces, etc.)
const formatInlineText = (text: string): JSX.Element[] => {
  if (!text) return [];
  
  // Detectar texto en negrita (**texto**)
  if (text.includes('**')) {
    const parts = text.split('**');
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-gray-900">
          {part}
        </strong>
      ) : (
        <span key={i}>{formatLinks(part)}</span>
      )
    );
  }
  
  // Detectar enlaces
  return formatLinks(text);
};

// Función para detectar y formatear enlaces
const formatLinks = (text: string): JSX.Element[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a 
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

interface Message {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

export default function AskPageWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && !isChatOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isExpanded, isChatOpen]);

  // Focus textarea when chat opens
  useEffect(() => {
    if (isChatOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isChatOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || isLoading) return;

    const currentQuestion = question.trim();
    setQuestion('');
    setIsLoading(true);
    setError(null);
    setIsChatOpen(true);

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      question: currentQuestion,
      answer: '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const pageContext = getPageContext();
      
      // DEBUG: Log del contexto de la página
      console.log('🔍 DEBUG - Frontend:');
      console.log('  Question:', currentQuestion);
      console.log('  PageContext length:', pageContext?.length || 0);
      console.log('  PageContext preview:', pageContext?.substring(0, 200) + '...');
      console.log('  URL:', window.location.href);
      
      const requestBody = {
        question: currentQuestion,
        pageContext,
        url: window.location.href
      };
      
      console.log('  Request body:', JSON.stringify(requestBody, null, 2));
      
      // Determinar la URL base según el ambiente
      const isDevelopment = window.location.hostname === 'localhost';
      const baseUrl = isDevelopment 
        ? '/api/ask-page' 
        : 'https://gyotechnologiesweb.onrender.com/api/ask-page';
      
      console.log('🔍 DEBUG - URL de la petición:', baseUrl);
      
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Update the message with the answer
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id 
          ? { ...msg, answer: data.answer }
          : msg
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      // Remove the user message if there was an error
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setIsChatOpen(false);
    setMessages([]);
    setError(null);
  };

  return (
    <>
             {/* ChatGPT-style Input Bar */}
       <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4">
                 <div className={`bg-white rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isExpanded ? (isChatOpen ? 'w-full max-w-2xl h-[500px]' : 'w-full max-w-2xl h-12') : 'w-64 h-12'
        }`}>
                     {!isExpanded ? (
             /* Initial State - Narrow Centered Input Bar */
             <div className="flex items-center justify-center h-full px-3">
               <div className="w-full flex items-center">
                 <input
                   ref={inputRef}
                   type="text"
                   placeholder="Ask Agent Oz..."
                   className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-sm text-center"
                   onClick={() => setIsExpanded(true)}
                   readOnly
                 />
               </div>
               <button
                 onClick={() => setIsExpanded(true)}
                 className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
                 aria-label="Expandir chat"
               >
                 <ChevronUp size={16} />
               </button>
             </div>
           ) : !isChatOpen ? (
             /* Expanded State - Wide Input Bar (before chat) */
             <form onSubmit={handleSubmit} className="flex items-center h-full px-4">
               <div className="w-full flex items-center">
                 <input
                   ref={inputRef}
                   type="text"
                   value={question}
                   onChange={(e) => setQuestion(e.target.value)}
                   onKeyPress={handleInputKeyPress}
                   placeholder="Ask Agent Oz..."
                   className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-sm"
                 />
               </div>
               <button
                 type="submit"
                 disabled={!question.trim() || isLoading}
                 className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                 aria-label="Enviar pregunta"
               >
                 <ChevronUp size={16} />
               </button>
             </form>
          ) : (
            /* Full Chat Interface */
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <MessageSquare size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Agent Oz</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Cerrar chat"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && !isLoading && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    <MessageSquare size={32} className="mx-auto mb-2 text-gray-300" />
                    <p>Haz una pregunta sobre el contenido de esta página</p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    {/* User Question */}
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-[80%] text-sm">
                        {message.question}
                      </div>
                    </div>
                    
                    {/* AI Answer */}
                    {message.answer && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-2 max-w-[80%]">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <MessageSquare size={12} className="text-white" />
                          </div>
                          <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                            <div className="space-y-2">
                              {formatAnswer(message.answer)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <MessageSquare size={12} className="text-white" />
                      </div>
                      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2 shadow-sm">
                        <Loader2 size={16} className="animate-spin text-purple-600" />
                        <span className="text-sm">Agent Oz está pensando...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Error message */}
                {error && (
                  <div className="flex justify-start">
                    <div className="bg-red-100 text-red-800 px-4 py-3 rounded-2xl rounded-bl-md max-w-[80%] text-sm">
                      {error}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
                <div className="flex gap-3">
                                     <textarea
                     ref={textareaRef}
                     value={question}
                     onChange={(e) => setQuestion(e.target.value)}
                     onKeyPress={handleTextareaKeyPress}
                     placeholder="Ask Agent Oz..."
                     className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     rows={1}
                     disabled={isLoading}
                     aria-label="Pregunta para Agent Oz"
                   />
                  <button
                    type="submit"
                    disabled={!question.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-200 flex items-center justify-center"
                    aria-label="Enviar pregunta"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 