import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ChevronUp } from 'lucide-react';
import { getPageContext } from '../lib/getPageContext';
import { getApiUrl } from '../lib/api';

// Función para formatear el texto de las respuestas
const formatAnswer = (text: string): JSX.Element[] => {
  if (!text) return [];
  
  // Dividir el texto en párrafos
  const paragraphs = text.split('\n').filter(p => p.trim());
  
  return paragraphs.map((paragraph, index) => {
    // Detectar títulos (líneas que terminan con :)
    if (paragraph.endsWith(':') && paragraph.length < 50) {
      return (
        <h4 key={index} className="mb-2 mt-4 text-sm font-black text-[#171411] first:mt-0">
          {paragraph}
        </h4>
      );
    }
    
    // Detectar listas numeradas (1., 2., etc.)
    if (/^\d+\.\s/.test(paragraph)) {
      return (
        <div key={index} className="flex items-start gap-2 mb-2">
          <span className="min-w-[20px] flex-shrink-0 text-sm font-black text-[#d75f32]">
            {paragraph.match(/^\d+/)?.[0]}.
          </span>
          <span className="text-sm leading-relaxed text-[#171411]/80">
            {formatInlineText(paragraph.replace(/^\d+\.\s/, ''))}
          </span>
        </div>
      );
    }
    
    // Detectar listas con viñetas (- o •)
    if (/^[-•]\s/.test(paragraph)) {
      return (
        <div key={index} className="flex items-start gap-2 mb-2">
          <span className="mt-1 flex-shrink-0 text-sm text-[#d75f32]">•</span>
          <span className="text-sm leading-relaxed text-[#171411]/80">
            {formatInlineText(paragraph.replace(/^[-•]\s/, ''))}
          </span>
        </div>
      );
    }
    
    // Párrafos normales con formateo inline
    return (
      <p key={index} className="mb-3 text-sm leading-relaxed text-[#171411]/80">
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
        <strong key={i} className="font-black text-[#171411]">
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
          className="text-[#d75f32] underline hover:text-[#171411]"
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
      
      const requestBody = {
        question: currentQuestion,
        pageContext,
        url: window.location.href
      };

      const response = await fetch(getApiUrl('/api/ask-page'), {
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

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent) => {
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
      <div className="fixed bottom-6 left-0 right-0 z-50 px-4">
        <div className={`mx-auto rounded-[1.75rem] border border-[#171411]/12 bg-[#f8f0e3]/95 shadow-2xl shadow-[#171411]/20 backdrop-blur-xl transition-all duration-300 ${
          !isExpanded
            ? 'w-64 h-12'
            : isChatOpen
              ? 'w-full max-w-2xl h-[500px]'
              : 'w-full max-w-2xl h-12'
        }`}>
          {!isExpanded ? (
             /* Initial State - Narrow Centered Input Bar */
             <div className="flex items-center justify-center h-full px-3">
               <div className="w-full flex items-center">
                 <input
                   ref={inputRef}
                   type="text"
                    placeholder="Preguntale a esta pagina..."
                    className="flex-1 bg-transparent border-none text-center text-sm font-bold text-[#171411] outline-none placeholder:text-[#171411]/55"
                   onClick={() => setIsExpanded(true)}
                   readOnly
                 />
               </div>
               <button
                 onClick={() => setIsExpanded(true)}
                  className="ml-2 rounded-full bg-[#171411] p-1.5 text-[#efe7da] transition-colors hover:bg-[#d75f32]"
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
                    onKeyDown={handleInputKeyDown}
                    placeholder="Preguntale a Agent GYO..."
                    className="flex-1 bg-transparent border-none text-sm font-semibold text-[#171411] outline-none placeholder:text-[#171411]/50"
                 />
               </div>
               <button
                 type="submit"
                 disabled={!question.trim() || isLoading}
                  className="ml-2 rounded-full bg-[#171411] p-1.5 text-[#efe7da] transition hover:bg-[#d75f32] disabled:opacity-50"
                 aria-label="Enviar pregunta"
               >
                 <ChevronUp size={16} />
               </button>
             </form>
          ) : (
            /* Full Chat Interface */
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#171411]/10 p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171411]">
                    <MessageSquare size={16} className="text-[#efe7da]" />
                  </div>
                  <div>
                    <h3 className="font-black leading-none tracking-[-0.03em] text-[#171411]">Agent GYO</h3>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#171411]/45">Contexto de pagina</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-full p-1 transition-colors hover:bg-[#171411]/10"
                  aria-label="Cerrar chat"
                >
                  <X size={18} className="text-[#171411]/65" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && !isLoading && (
                  <div className="py-8 text-center text-sm text-[#171411]/55">
                    <MessageSquare size={32} className="mx-auto mb-2 text-[#171411]/25" />
                    <p>Haz una pregunta sobre el contenido de esta página</p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    {/* User Question */}
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[#171411] px-4 py-3 text-sm text-[#efe7da]">
                        {message.question}
                      </div>
                    </div>
                    
                    {/* AI Answer */}
                    {message.answer && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-2 max-w-[80%]">
                           <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#d75f32]">
                             <MessageSquare size={12} className="text-[#171411]" />
                           </div>
                           <div className="rounded-2xl rounded-bl-md bg-[#efe7da] px-4 py-3 text-[#171411] shadow-sm">
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
                       <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#d75f32]">
                         <MessageSquare size={12} className="text-[#171411]" />
                       </div>
                       <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-[#efe7da] px-4 py-3 text-[#171411] shadow-sm">
                         <Loader2 size={16} className="animate-spin text-[#d75f32]" />
                         <span className="text-sm">Agent GYO está pensando...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Error message */}
                {error && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-[#d75f32]/30 bg-[#d75f32]/10 px-4 py-3 text-sm text-[#171411]">
                      {error}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="border-t border-[#171411]/10 p-4">
                 <div className="flex gap-3">
                                     <textarea
                     ref={textareaRef}
                     value={question}
                     onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={handleTextareaKeyDown}
                      placeholder="Preguntale a Agent GYO..."
                      className="flex-1 resize-none rounded-2xl border border-[#171411]/12 bg-[#efe7da] px-4 py-3 text-sm text-[#171411] outline-none transition placeholder:text-[#171411]/45 focus:border-[#d75f32]"
                     rows={1}
                     disabled={isLoading}
                     aria-label="Pregunta para Agent GYO"
                   />
                  <button
                    type="submit"
                    disabled={!question.trim() || isLoading}
                     className="flex items-center justify-center rounded-2xl bg-[#171411] p-3 text-[#efe7da] transition-all duration-200 hover:bg-[#d75f32] disabled:bg-[#171411]/35"
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
