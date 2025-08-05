import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ChevronUp } from 'lucide-react';
import { getPageContext } from '../lib/getPageContext';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus textarea when expanded
  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isExpanded]);

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
      
      const response = await fetch('/api/ask-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion,
          pageContext,
          url: window.location.href
        })
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-full px-4">
        <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isExpanded ? 'h-96' : 'h-14'
        }`}>
          {!isExpanded ? (
            /* Collapsed State - Narrow Input Bar */
            <div className="flex items-center justify-center h-full px-4">
              <div className="max-w-md w-full flex items-center">
                <input
                  type="text"
                  placeholder="Ask Agent Oz..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-base text-center"
                  onClick={() => setIsExpanded(true)}
                  readOnly
                />
              </div>
              <button
                onClick={() => setIsExpanded(true)}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Expandir chat"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          ) : (
            /* Expanded State - Full Chat Interface */
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
                {messages.length === 0 && !isLoading && !isChatOpen && (
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
                        <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md max-w-[80%] text-sm leading-relaxed">
                          {message.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">Agent Oz está pensando...</span>
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
                    onKeyPress={handleKeyPress}
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