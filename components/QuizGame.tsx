import React, { useState, useEffect } from 'react';
import { generateQuizQuestion } from '../services/gemini';
import { QuizQuestion } from '../types';
import { Trophy, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const QuizGame: React.FC<Props> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const fetchNewQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    const q = await generateQuizQuestion();
    setCurrentQuestion(q);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || !currentQuestion) return;
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700 font-semibold">
          &larr; Sortir
        </button>
        <div className="flex gap-4">
           <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold shadow-sm">
             <Trophy size={18} />
             <span>{score} punts</span>
           </div>
           {streak > 1 && (
             <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-2 rounded-full font-bold text-sm animate-pulse">
               🔥 {streak} seguidies!
             </div>
           )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-indigo-100 min-h-[400px] flex flex-col relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
            <Loader2 size={48} className="text-indigo-500 animate-spin mb-4" />
            <p className="text-slate-500 animate-pulse font-medium">El Mestre Pau està escrivint la pregunta...</p>
          </div>
        ) : currentQuestion ? (
          <div className="p-8 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                const showResult = selectedAnswer !== null;

                let btnClass = "p-4 rounded-xl text-lg font-semibold border-2 transition-all duration-200 flex items-center justify-between group ";
                
                if (!showResult) {
                  btnClass += "bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 hover:shadow-md cursor-pointer";
                } else {
                  if (isCorrect) {
                    btnClass += "bg-green-100 border-green-500 text-green-900 shadow-md";
                  } else if (isSelected && !isCorrect) {
                    btnClass += "bg-red-100 border-red-500 text-red-900 opacity-80";
                  } else {
                    btnClass += "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                  }
                }

                return (
                  <button 
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={btnClass}
                  >
                    <span>{option}</span>
                    {showResult && isCorrect && <CheckCircle2 className="text-green-600" />}
                    {showResult && isSelected && !isCorrect && <AlertCircle className="text-red-500" />}
                  </button>
                );
              })}
            </div>

            {selectedAnswer && (
              <div className="mt-auto animate-fade-in-up">
                <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-indigo-50 text-indigo-800'}`}>
                  <div className="mt-1">
                    {selectedAnswer === currentQuestion.correctAnswer ? <CheckCircle2 size={20} /> : <Info className="text-indigo-500" size={20} />}
                  </div>
                  <div>
                    <span className="font-bold block mb-1">
                      {selectedAnswer === currentQuestion.correctAnswer ? 'Molt bé!' : `La resposta correcta era: ${currentQuestion.correctAnswer}`}
                    </span>
                    <p className="text-sm opacity-90">{currentQuestion.explanation}</p>
                  </div>
                </div>
                
                <button 
                  onClick={fetchNewQuestion}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Següent Pregunta <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p>No s'ha pogut carregar la pregunta.</p>
            <button onClick={fetchNewQuestion} className="mt-4 text-indigo-600 underline">Torna-ho a provar</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Info icon component since I didn't import it in the destructured imports
const Info = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export default QuizGame;