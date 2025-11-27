import { FamilyType, Instrument } from './types';

export const INSTRUMENTS: Instrument[] = [
  // Corda
  {
    id: 'violin',
    name: 'Violí',
    family: FamilyType.STRINGS,
    description: "És l'instrument més petit i agut de la família de corda. Té 4 cordes i es toca amb un arc.",
    funFact: "En una orquestra hi ha més violins que qualsevol altre instrument!",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Violin_VL100.jpg/480px-Violin_VL100.jpg"
  },
  {
    id: 'viola',
    name: 'Viola',
    family: FamilyType.STRINGS,
    description: "És una mica més gran que el violí i té un so més greu i càlid.",
    funFact: "La viola llegeix la música en una clau especial anomenada 'Clau de Do'.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bratsche.jpg/480px-Bratsche.jpg"
  },
  {
    id: 'cello',
    name: 'Violoncel',
    family: FamilyType.STRINGS,
    description: "Es toca assegut i es recolza a terra amb una pica. Té un so profund i bonic.",
    funFact: "El violoncel té un registre molt ampli, pot sonar molt greu o cantar com una veu humana.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Cello_front_side.jpg/360px-Cello_front_side.jpg"
  },
  {
    id: 'doublebass',
    name: 'Contrabaix',
    family: FamilyType.STRINGS,
    description: "És l'avi de la família! És enorme i té el so més greu de tots.",
    funFact: "Els contrabaixistes sovint toquen drets o asseguts en tamborets molt alts.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Ag_contrabass.jpg/360px-Ag_contrabass.jpg"
  },
  {
    id: 'harp',
    name: 'Arpa',
    family: FamilyType.STRINGS,
    description: "Té 47 cordes i 7 pedals. Es toca pessigant les cordes amb els dits.",
    funFact: "L'arpa és un dels instruments més antics del món.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Pedal_Harp_Front.jpg/360px-Pedal_Harp_Front.jpg"
  },

  // Vent Fusta
  {
    id: 'flute',
    name: 'Flauta Travessera',
    family: FamilyType.WOODWIND,
    description: "Feta de metall (plata o or), però pertany a la família de fusta pel seu origen.",
    funFact: "La flauta necessita molt aire, els flautistes tenen uns pulmons molt forts!",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Western_concert_flute_%28Yamaha%29.jpg/640px-Western_concert_flute_%28Yamaha%29.jpg"
  },
  {
    id: 'oboe',
    name: 'Oboè',
    family: FamilyType.WOODWIND,
    description: "Té una llengüeta doble i un so nasal molt característic.",
    funFact: "L'oboè és l'encarregat de donar la nota 'La' perquè tota l'orquestra afini.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Oboe-Yamaha-YOB-431.jpg/640px-Oboe-Yamaha-YOB-431.jpg"
  },
  {
    id: 'clarinet',
    name: 'Clarinet',
    family: FamilyType.WOODWIND,
    description: "Utilitza una llengüeta simple. Té un cos negre i claus platejades.",
    funFact: "El clarinet pot fer notes extremadament suaus, gairebé imperceptibles.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Yamaha_Clarinet_YCL-457II-22.jpg/640px-Yamaha_Clarinet_YCL-457II-22.jpg"
  },
  {
    id: 'bassoon',
    name: 'Fagot',
    family: FamilyType.WOODWIND,
    description: "És el més greu de la fusta. És un tub molt llarg plegat per la meitat.",
    funFact: "Sovint es diu que el fagot és el 'pallasso' de l'orquestra pel seu so divertit en staccato.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Bassoon-On-White.jpg/320px-Bassoon-On-White.jpg"
  },

  // Vent Metall
  {
    id: 'trumpet',
    name: 'Trompeta',
    family: FamilyType.BRASS,
    description: "Té un so brillant i potent. Utilitza pistons per canviar les notes.",
    funFact: "Les trompetes s'utilitzaven antigament per enviar senyals a la batalla.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/640px-Yamaha_Trumpet_YTR-8335LA_crop.jpg"
  },
  {
    id: 'horn',
    name: 'Trompa',
    family: FamilyType.BRASS,
    description: "És un tub molt llarg enrotllat en forma de caragol. Té un so molt dolç.",
    funFact: "Si desenrotlléssim una trompa, faria gairebé 4 metres de llarg!",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Paxman_Model_20_Horn.jpg/500px-Paxman_Model_20_Horn.jpg"
  },
  {
    id: 'trombone',
    name: 'Trombó',
    family: FamilyType.BRASS,
    description: "No té pistons, sinó una vara que s'allarga i s'arronsa per fer les notes.",
    funFact: "El trombó pot fer un efecte divertit anomenat 'glissando' lliscant la vara.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Tenor_Trombone_on_white_background.jpg/640px-Tenor_Trombone_on_white_background.jpg"
  },
  {
    id: 'tuba',
    name: 'Tuba',
    family: FamilyType.BRASS,
    description: "És l'instrument més gran i greu del metall. Es necessita molt aire per tocar-la.",
    funFact: "La tuba és com la base d'un edifici, aguanta el so de tota la secció de metall.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Yamaha_YBB-105_Tuba.jpg/640px-Yamaha_YBB-105_Tuba.jpg"
  },

  // Percussió
  {
    id: 'timpani',
    name: 'Timbals',
    family: FamilyType.PERCUSSION,
    description: "Són tambors grans que es poden afinar per fer notes concretes.",
    funFact: "El timbaler és sovint considerat el segon director de l'orquestra pel seu paper rítmic.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Hardtke_Pauken.jpg/640px-Hardtke_Pauken.jpg"
  },
  {
    id: 'xylophone',
    name: 'Xilòfon',
    family: FamilyType.PERCUSSION,
    description: "Té làmines de fusta que es toquen amb baquetes dures.",
    funFact: "El nom ve del grec: 'Xylon' vol dir fusta i 'Phone' vol dir so.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Xylophone_-_fretless.jpg/640px-Xylophone_-_fretless.jpg"
  },
  {
    id: 'cymbals',
    name: 'Plats',
    family: FamilyType.PERCUSSION,
    description: "Dos discs de metall que es xoquen entre ells. Fan un so estrepitós!",
    funFact: "Els plats han de xocar-se una mica de biaix perquè no facin el buit i sonin apagats.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cymbales.jpg/640px-Cymbales.jpg"
  },
  {
    id: 'snare',
    name: 'Caixa',
    family: FamilyType.PERCUSSION,
    description: "Un tambor amb uns filferros a sota (bordons) que li donen un so metàl·lic.",
    funFact: "És l'instrument principal per marcar el ritme de marxa militar.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Snare_drum_-_top.jpg/640px-Snare_drum_-_top.jpg"
  }
];

export const FAMILY_COLORS = {
  [FamilyType.STRINGS]: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200',
  [FamilyType.WOODWIND]: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200',
  [FamilyType.BRASS]: 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200',
  [FamilyType.PERCUSSION]: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200',
};

export const FAMILY_BG = {
  [FamilyType.STRINGS]: 'bg-blue-50',
  [FamilyType.WOODWIND]: 'bg-green-50',
  [FamilyType.BRASS]: 'bg-amber-50',
  [FamilyType.PERCUSSION]: 'bg-red-50',
};