import ak47 from './assets/ak47.png';
import india from './assets/india.png';
import king from './assets/king.png';

export interface Puzzle {
  id: number;
  type: 'missing_letter' | 'predict_word' | 'pattern' | 'cryptic' | 'audio' | 'images';
  question: {
    en: string;
    ml: string;
  };
  answer: string; // The correct answer (case-insensitive)
  hint?: {
    en: string;
    ml: string;
  };
  audioSrc?: string;
  imageSrcs?: string[];
  inputType?: 'text' | 'otp';
  displayMask?: string;
}

export const puzzles: Puzzle[] = [
  {
    id: 1,
    type: 'missing_letter',
    question: {
      en: "W _ N N _ R. What are the missing letters?",
      ml: "W _ N N _ R. വിട്ടുപോയ അക്ഷരങ്ങൾ ഏവ?"
    },
    answer: "WINNER",
    inputType: 'otp',
    displayMask: "W_NN_R",
    hint: {
      en: "It is someone who takes first place.",
      ml: "ഒന്നാം സ്ഥാനം നേടുന്ന ആൾ."
    }
  },
  {
    id: 2,
    type: 'predict_word',
    question: {
      en: "The more you take, the more you leave behind. What am I?",
      ml: "കൂടുതൽ എടുക്കുന്തോറും കൂടുതൽ പിന്നിലാകുന്നു. ഞാൻ ആരാണ്?",
    },
    answer: "footsteps", 
  },
  {
    id: 3,
    type: 'pattern',
    question: {
      en: "2, 6, 12, 20, 30, ? What comes next?",
      ml: "2, 6, 12, 20, 30, ? അടുത്തത് എന്താണ്?"
    },
    answer: "42",
    hint: {
      en: "Add consecutive even numbers (4, 6, 8, 10, ...)",
      ml: "തുടർച്ചയായ ഇരട്ട സംഖ്യകൾ കൂട്ടുക (4, 6, 8, 10, ...)"
    }
  },
  {
    id: 4,
    type: 'cryptic',
    question: {
      en: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      ml: "വായ ഇല്ലാതെ സംസാരിക്കുന്നു, ചെവി ഇല്ലാതെ കേൾക്കുന്നു. കാറ്റിൽ ജീവൻ വെക്കുന്നു. ഞാൻ ആരാണ്?"
    },
    answer: "echo"
  },
  {
    id: 5,
    type: 'predict_word',
    question: {
      en: "A classic 1993 psychological thriller where a woman gets possessed by a dancer's spirit. Name the movie.",
      ml: "1993-ൽ പുറത്തിറങ്ങിയ ഒരു ക്ലാസിക് സൈക്കോളജിക്കൽ ത്രില്ലർ. ഒരു നർത്തകിയുടെ ആത്മാവ് നായികയെ ബാധിക്കുന്നതാണ് കഥ. സിനിമയുടെ പേരെന്ത്?"
    },
    answer: "MANICHITRATHAZHU",
    hint: {
      en: "Ganga becomes Nagavalli.",
      ml: "ഗംഗ നാഗവല്ലിയായി മാറുന്നു."
    }
  },
  {
    id: 6,
    type: 'predict_word',
    question: {
      en: "A lonely well, a haunting blue light, and a love song in a deserted mansion. A writer rents a house and finds a ghost as his muse. The film's title is her address. Which 1964 classic is this?",
      ml: "നീലവെളിച്ചം, ഏകാന്തമായ ഒരു കിണർ, ഒരു എഴുത്തുകാരനെ പ്രചോദിപ്പിച്ച ഒരു പ്രേതം. അവളുടെ വിലാസമാണ് ഈ സിനിമയുടെ പേര്. 1964-ൽ ഇറങ്ങിയ ഈ ക്ലാസിക് സിനിമ ഏത്?"
    },
    answer: "BHARGAVI NILAYAM",
    hint: {
      en: "Based on Vaikom Muhammad Basheer's 'Neelavelicham'.",
      ml: "വൈക്കം മുഹമ്മദ് ബഷീറിന്റെ 'നീലവെളിച്ചം' എന്ന കഥയെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്."
    }
  },
  {
    id: 7,
    type: 'audio',
    question: {
      en: "Which show's audio is this?",
      ml: "ഇത് ഏത് ഷോയുടെ ഓഡിയോ ആണ്?"
    },
    answer: "JACKIE CHAN",
    audioSrc: "/assets/audio-1-final.mp3",
    inputType: 'otp'
  },
  {
    id: 8,
    type: 'images',
    question: {
      en: "Identify the movie from these images.",
      ml: "ഈ ചിത്രങ്ങളിൽ നിന്ന് സിനിമയുടെ പേര് കണ്ടെത്തുക."
    },
    answer: "SHERSHAAH",
    imageSrcs: [ak47, india, king]
  }
];
