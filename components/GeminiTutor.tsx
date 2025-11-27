import React, { useState, useEffect, useRef } from 'react';
import { askTheConductor } from '../services/gemini';
import { ChatMessage, Instrument } from '../types';
import { X, Send, Sparkles, User, Music4 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contextInstrument: Instrument | null;
}

const GeminiTutor: React.FC<Props> = ({ isOpen, onClose, contextInstrument }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      const greeting = contextInstrument 
        ? `Hola! Veig que estàs mirant el **${contextInstrument.name}**. Què vols saber sobre aquest instrument? 🎵`
        : "Hola! Sóc el Mestre Pau 🎩. Pregunta'm el que vulguis sobre l'orquestra!";
      
      setMessages([{ role: 'model', text: greeting }]);
    }
    // If context changes while open, add a bridge message? Maybe simpler to just reset if opened fresh.
    // Keeping it simple for now.
  }, [isOpen, contextInstrument]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const context = contextInstrument ? contextInstrument.name : "l'orquestra simfònica";
    const response = await askTheConductor(userText, context);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden border-2 border-indigo-100">
        
        {/* Header */}
        <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-full">
              <Sparkles size={20} className="text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Mestre Denis</h3>
              <p className="text-xs text-indigo-200">El teu guia musical (IA)</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Music4 size={16} />}
              </div>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Music4 size={16} />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
           {contextInstrument && (
              <div className="mb-2 text-xs text-indigo-500 font-semibold px-2">
                Parlant de: {contextInstrument.name}
              </div>
           )}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregunta alguna cosa..."
              className="flex-1 border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiTutor;