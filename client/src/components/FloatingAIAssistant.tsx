import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  Maximize2, 
  Wrench, 
  Cpu, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { sendChatMessage } from '../services/api';
import { ChatMessage, DiagnosisResult } from '../types';

interface FloatingAIAssistantProps {
  currentDiagnosis?: DiagnosisResult | null;
}

export const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({
  currentDiagnosis,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      text: 'Hello! I am your RRR AI Assistant. Ask me anything about troubleshooting, spare part sourcing in Visakhapatnam, or how our Economic Brain calculated your repair viability score!',
      suggestions: [
        'Where can I buy spare bearings in Vizag?',
        'Explain the Viability Score formula',
        'Should I replace the capacitor myself?'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(query, currentDiagnosis);
      const assistantMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: reply,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        text: 'Sorry, I encountered a temporary connection issue. You can safely check our DIY guide or contact Sri Balaji Appliance Care in MVP Colony directly.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2 rounded-full bg-gradient-to-r from-brand-500 to-emerald-600 px-4 py-3.5 text-black shadow-2xl shadow-brand-500/40 hover:scale-105 transition-all duration-200 active:scale-95"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
          </span>
          <Bot className="h-5 w-5 text-black" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-black">
            Ask RRR AI Assistant
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-2xl border border-industrial-700 bg-industrial-950 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-industrial-800 bg-industrial-900/90 px-4 py-3">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-black">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <span>Ask RRR AI Assistant</span>
                  <span className="rounded bg-brand-950 px-1 py-0.2 text-[9px] font-mono text-brand-400 border border-brand-800">
                    Live
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400">
                  {currentDiagnosis
                    ? `Context: ${currentDiagnosis.productMetadata.brand} ${currentDiagnosis.productMetadata.category}`
                    : 'Visakhapatnam Diagnostic Support'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-industrial-800 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none shadow-md shadow-brand-600/20'
                      : 'bg-industrial-900 text-slate-200 border border-industrial-800 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-500 mt-1 font-mono">
                  {m.timestamp}
                </span>

                {/* Suggestions chips */}
                {m.suggestions && m.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-col space-y-1.5 w-full">
                    {m.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(s)}
                        className="text-left rounded-lg border border-industrial-800 bg-industrial-900/60 p-2 text-[11px] text-brand-300 hover:border-brand-500 hover:bg-industrial-800 transition-all"
                      >
                        💡 {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Bot className="h-4 w-4 animate-spin text-brand-400" />
                <span>Assistant is consulting the diagnostic database...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-industrial-800 bg-industrial-900/90 p-3 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about parts, DIY steps, or Vizag shops..."
              className="flex-1 rounded-xl border border-industrial-700 bg-industrial-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-xl bg-brand-500 p-2 text-black hover:bg-brand-400 transition-colors disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
