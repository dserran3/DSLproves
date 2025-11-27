export enum FamilyType {
  STRINGS = 'Corda',
  WOODWIND = 'Vent Fusta',
  BRASS = 'Vent Metall',
  PERCUSSION = 'Percussió'
}

export interface Instrument {
  id: string;
  name: string;
  family: FamilyType;
  description: string;
  funFact: string; // Curiositat inicial
  imageUrl: string; // Changed from imageSeed to specific URL
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}