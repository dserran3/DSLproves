import React, { useState, useEffect } from 'react';
import { Instrument } from '../types';
import { FAMILY_COLORS } from '../constants';
import { Mic2, Sparkles, Loader2, Music } from 'lucide-react';
import { generateInstrumentImage } from '../services/gemini';

interface Props {
  instrument: Instrument;
  onClick: () => void;
  onAskAI: (instrument: Instrument) => void;
}

const InstrumentCard: React.FC<Props> = ({ instrument, onClick, onAskAI }) => {
  const colorClass = FAMILY_COLORS[instrument.family];
  const [displayImage, setDisplayImage] = useState(instrument.imageUrl);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Sync state if prop changes (e.g. when list updates)
  useEffect(() => {
    setDisplayImage(instrument.imageUrl);
    setImgError(false);
  }, [instrument.imageUrl]);

  const handleMagicImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGenerating(true);
    setImgError(false);
    const newImage = await generateInstrumentImage(instrument.name);
    if (newImage) {
      setDisplayImage(newImage);
    }
    setIsGenerating(false);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer flex flex-col h-full border border-slate-100 group"
      onClick={onClick}
    >
      <div className="relative h-48 bg-white overflow-hidden p-4 flex items-center justify-center">
        {/* Magic Image Button */}
        <button
          onClick={handleMagicImage}
          disabled={isGenerating}
          className="absolute top-2 left-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-indigo-50 text-indigo-600 transition-all z-10 disabled:opacity-70 border border-indigo-100 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
          title="Generar imatge màgica (IA)"
        >
          {isGenerating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
        </button>

        {imgError ? (
          <div className="flex flex-col items-center justify-center text-slate-300 w-full h-full bg-slate-50 rounded-lg">
            <Music size={64} strokeWidth={1.5} />
            <span className="text-xs font-medium mt-2">Imatge no disponible</span>
          </div>
        ) : (
          <img 
            src={displayImage} 
            alt={instrument.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-contain transition-transform duration-500 hover:scale-105 ${isGenerating ? 'opacity-50 blur-sm scale-95' : ''}`}
          />
        )}

        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border ${colorClass}`}>
          {instrument.family}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-800 mb-2 font-display">{instrument.name}</h3>
        <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">
          {instrument.description}
        </p>
        
        <div className="mt-auto flex gap-2">
           <button 
            className="flex-1 bg-indigo-50 text-indigo-700 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 border border-indigo-100"
            onClick={(e) => {
              e.stopPropagation();
              onAskAI(instrument);
            }}
          >
            <Mic2 size={16} />
            Pregunta al Mestre
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstrumentCard;