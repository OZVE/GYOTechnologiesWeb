import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { getPageContext } from '../lib/getPageContext';

interface Message {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

export default function AskPageWidget() {
  const [isOpen, setIsOpen] = useState(false);
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

  // Focus textarea when widget opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || isLoading) return;

    const currentQuestion = question.trim();
    setQuestion('');
    setIsLoading(true);
    setError(null);

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

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Pregúntale a esta página"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-300" />
        ) : (
          <MessageSquare size={24} className="transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>

      {/* Widget Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              <h3 className="font-semibold text-sm">Pregúntale a esta página</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X size={16} />
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
              <div key={message.id} className="space-y-2">
                {/* User Question */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-2xl rounded-br-md max-w-[80%] text-sm">
                    {message.question}
                  </div>
                </div>
                
                {/* AI Answer */}
                {message.answer && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-2xl rounded-bl-md max-w-[80%] text-sm">
                      {message.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-2xl rounded-bl-md flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Pensando...</span>
                </div>
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="flex justify-start">
                <div className="bg-red-100 text-red-800 px-3 py-2 rounded-2xl rounded-bl-md max-w-[80%] text-sm">
                  {error}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <textarea
                ref={textareaRef}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 resize-none border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={2}
                disabled={isLoading}
                aria-label="Pregunta"
              />
              <button
                type="submit"
                disabled={!question.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-2 rounded-xl transition-all duration-200 flex items-center justify-center"
                aria-label="Enviar pregunta"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
} 