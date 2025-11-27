import React, { useState } from 'react';
import { Instrument, FamilyType } from './types';
import { INSTRUMENTS, FAMILY_BG, FAMILY_COLORS } from './constants';
import InstrumentCard from './components/InstrumentCard';
import GeminiTutor from './components/GeminiTutor';
import QuizGame from './components/QuizGame';
import { Music, GraduationCap, Mic2, Heart, HelpCircle, User } from 'lucide-react';

enum View {
  HOME,
  FAMILY,
  QUIZ,
  DETAIL // Could be a modal, but sticking to simpler layout for now
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedFamily, setSelectedFamily] = useState<FamilyType | null>(null);
  const [isTutorOpen, setTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState<Instrument | null>(null);
  const [selectedInstrumentDetails, setSelectedInstrumentDetails] = useState<Instrument | null>(null);

  // Filter instruments based on selection
  const visibleInstruments = selectedFamily 
    ? INSTRUMENTS.filter(i => i.family === selectedFamily)
    : INSTRUMENTS;

  const handleFamilySelect = (family: FamilyType) => {
    setSelectedFamily(family);
    setCurrentView(View.FAMILY);
  };

  const openTutor = (context: Instrument | null) => {
    setTutorContext(context);
    setTutorOpen(true);
  };

  const handleInstrumentClick = (instrument: Instrument) => {
    setSelectedInstrumentDetails(instrument);
    // In a fuller app, this would open a detailed page. 
    // For now, let's open the tutor to talk about it immediately or show a simple detail modal.
    // Let's use the Tutor as the primary detail interaction to leverage Gemini.
    openTutor(instrument);
  };

  return (
    <div className={`min-h-screen pb-12 transition-colors duration-500 ${selectedFamily ? FAMILY_BG[selectedFamily] : 'bg-slate-50'}`}>
      
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => {
              setCurrentView(View.HOME);
              setSelectedFamily(null);
            }}
          >
            <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:bg-indigo-700 transition">
              <Music size={24} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">L'Orquestra Màgica</h1>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setCurrentView(View.QUIZ)}
              className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold hover:bg-yellow-200 transition"
            >
              <GraduationCap size={20} />
              <span className="hidden sm:inline">Jugar a Test</span>
            </button>
            <button 
              onClick={() => openTutor(null)}
              className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-bold hover:bg-indigo-200 transition"
            >
              <User size={20} />
              <span className="hidden sm:inline">Mestre Denis</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pt-8">
        
        {/* Welcome Header (Home only) */}
        {currentView === View.HOME && (
          <div className="text-center mb-12 animate-fade-in-down">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Descobreix els sons de l'orquestra</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tria una família d'instruments o posa a prova els teus coneixements. 
              El Mestre Pau està aquí per ajudar-te!
            </p>
          </div>
        )}

        {/* View: Home (Family Selector) */}
        {currentView === View.HOME && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(FamilyType).map((family) => (
              <button
                key={family}
                onClick={() => handleFamilySelect(family)}
                className={`p-8 rounded-3xl text-left transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border-2 ${FAMILY_COLORS[family].replace('text-', 'border-').replace('bg-', 'bg-white ')}`}
              >
                <h3 className="text-2xl font-bold mb-2">{family}</h3>
                <p className="opacity-70 text-sm">Fes clic per veure els instruments</p>
              </button>
            ))}
             {/* Big Quiz Button on Home */}
             <button
                onClick={() => setCurrentView(View.QUIZ)}
                className="col-span-1 md:col-span-2 lg:col-span-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-3xl text-center transform hover:scale-[1.02] transition shadow-lg flex flex-col items-center justify-center gap-4"
              >
                <GraduationCap size={48} />
                <div>
                  <h3 className="text-3xl font-bold">Posa't a prova!</h3>
                  <p className="text-indigo-100">Demostra tot el que saps amb un joc de preguntes.</p>
                </div>
              </button>
          </div>
        )}

        {/* View: Family Details */}
        {currentView === View.FAMILY && selectedFamily && (
          <div className="animate-fade-in">
             <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => {
                    setSelectedFamily(null);
                    setCurrentView(View.HOME);
                  }}
                  className="bg-white p-2 rounded-full shadow hover:bg-slate-100 transition"
                >
                  &larr; Tornar
                </button>
                <h2 className="text-3xl font-bold text-slate-800">{selectedFamily}</h2>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {visibleInstruments.map((inst) => (
                 <InstrumentCard 
                    key={inst.id} 
                    instrument={inst} 
                    onClick={() => handleInstrumentClick(inst)}
                    onAskAI={openTutor}
                 />
               ))}
             </div>
          </div>
        )}

        {/* View: Quiz */}
        {currentView === View.QUIZ && (
          <QuizGame onBack={() => setCurrentView(View.HOME)} />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-slate-500 text-sm border-t border-slate-200">
        <p className="flex items-center justify-center gap-2">
          Fet amb <Heart size={16} className="text-red-400 fill-current" /> per a l'educació musical
        </p>
      </footer>

      {/* Global Components */}
      <GeminiTutor 
        isOpen={isTutorOpen} 
        onClose={() => setTutorOpen(false)} 
        contextInstrument={tutorContext}
      />

    </div>
  );
};

export default App;