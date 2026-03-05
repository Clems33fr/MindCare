import React, { useState } from 'react';
import { Home, BookOpen, HeartHandshake, Settings, ChevronLeft, Calendar, BarChart2, X, ChevronRight, PlayCircle, Info, Activity, CheckCircle, Clock, Volume2, Heart, AlertTriangle, Phone, Globe, Shield, Moon, Bell, Lock, CreditCard, Paintbrush, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- CONSTANTS & THEME ---
const COLORS = {
  bg: '#F8F9F7',
  surface: '#FFFFFF',
  textPrimary: '#1F1F1F', // Dark Gray (No pure black)
  textSecondary: '#5F6368',
  textMuted: '#9AA0A6',
  border: '#E6E7E3',
  brand: {
    greenPrimary: '#7EA38B',
    greenSecondary: '#A5C8B2',
    blueMain: '#6B9BB8',
    blueLight: '#9EB7C4',
    purpleSoft: '#B9A7BB',
    peachCTA: '#F2B9A0',
  }
};

// NOTE: Figma Make uses `figma:asset/...` imports which won't resolve in a standard React build.
// Replace this URL with your local asset path (e.g. `/assets/logo.png`) once you add it to your project.
const logoAsset = "https://dummyimage.com/256x256/7EA38B/ffffff.png&text=MindCare";

// --- TYPOGRAPHY COMPONENTS ---
const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h1 className={cn("font-['Manrope'] font-normal text-[36px] leading-tight text-[#1F1F1F]", className)}>
    {children}
  </h1>
);

const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn("font-['Manrope'] font-medium text-[24px] leading-snug text-[#1F1F1F]", className)}>
    {children}
  </h2>
);

const TextBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("font-['Inter'] font-normal text-[14px] leading-relaxed text-[#1F1F1F]", className)}>
    {children}
  </p>
);

// --- BRAND COMPONENTS ---
const BrandLogo = ({ size = 'medium', className }: { size?: 'small' | 'medium' | 'large', className?: string }) => {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-[72px] h-[72px]'
  };

  return (
    <img 
      src={logoAsset} 
      alt="MindCare Logo" 
      className={cn(sizes[size], "object-contain", className)}
    />
  );
};

// --- GENERIC COMPONENTS ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  icon: Icon,
  fullWidth,
  onClick 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'ghost'; 
  className?: string;
  icon?: any;
  fullWidth?: boolean;
  onClick?: () => void;
}) => {
  const baseStyles = "h-12 px-6 rounded-full font-semibold text-[16px] flex items-center justify-center gap-2 transition-transform active:scale-95 font-['Inter']";
  const variants = {
    primary: "bg-[#F2B9A0] text-[#1F1F1F] shadow-sm hover:opacity-90", // Peach CTA
    secondary: "bg-white border border-[#E6E7E3] text-[#1F1F1F] hover:bg-gray-50",
    ghost: "bg-transparent text-[#5F6368] hover:bg-gray-100"
  };

  return (
    <button 
      onClick={onClick}
      className={cn(baseStyles, variants[variant], fullWidth && "w-full", className)}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

const Card = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-white rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden",
      onClick && "cursor-pointer active:scale-[0.98] transition-transform",
      className
    )}
  >
    {children}
  </div>
);

const Chip = ({ 
  label, 
  active, 
  onClick 
}: { 
  label: string; 
  active?: boolean; 
  onClick?: () => void 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-[14px] font-medium transition-colors whitespace-nowrap font-['Inter']",
      active 
        ? "bg-[#7EA38B] text-white" // Primary Green for active
        : "bg-white border border-[#E6E7E3] text-[#5F6368] hover:bg-gray-50"
    )}
  >
    {label}
  </button>
);

const BottomBar = ({ activeTab, onNavigate }: { activeTab: string; onNavigate: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'learn', label: 'Comprendre', icon: BookOpen },
    { id: 'help', label: 'Aide', icon: HeartHandshake },
    { id: 'settings', label: 'Réglages', icon: Settings },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-white border-t border-[#E6E7E3] px-6 flex justify-between items-center z-50">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex flex-col items-center justify-center gap-1 w-16 h-full"
          >
            <div className={cn(
              "p-1 rounded-full transition-colors",
              isActive ? "text-[#7EA38B]" : "text-[#9AA0A6]" // Active primary green
            )}>
              <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={cn(
              "text-[10px] font-medium font-['Inter']",
              isActive ? "text-[#1F1F1F]" : "text-[#9AA0A6]"
            )}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const TopBar = ({ 
  title, 
  showBack, 
  onBack,
  rightAction 
}: { 
  title?: string; 
  showBack?: boolean; 
  onBack?: () => void;
  rightAction?: React.ReactNode;
}) => (
  <div className="h-[60px] flex items-center justify-between px-4 sticky top-0 bg-[#F8F9F7] z-40 shrink-0">
    <div className="w-10 flex justify-start">
      {showBack && (
        <button onClick={onBack} className="p-2 -ml-2 text-[#1F1F1F] rounded-full hover:bg-gray-100">
          <ChevronLeft size={24} />
        </button>
      )}
    </div>
    <div className="font-['Manrope'] font-medium text-[16px] text-[#1F1F1F]">
      {title}
    </div>
    <div className="w-10 flex justify-end">
      {rightAction}
    </div>
  </div>
);

// --- DATA ---
const CONTENT_DATA = [
  // Section: Comprendre ce que tu ressens
  {
    id: 'art-stress-1',
    section: 'understand',
    type: 'Article',
    title: "Le stress, c’est quoi exactement ?",
    duration: '3 min',
    tags: ['stress'],
    isRead: true,
    content: `Le stress est une réaction naturelle de l'organisme face à une situation perçue comme menaçante ou exigeante. C'est un mécanisme de survie hérité de nos ancêtres.\n\nIl existe deux types de stress :\n\n1. Le "bon" stress : il nous motive, nous donne de l'énergie pour affronter un défi (examen, prise de parole).\n2. Le "mauvais" stress : lorsqu'il devient chronique, il épuise l'organisme et peut mener à l'anxiété ou au burn-out.\n\nReconnaître ses symptômes (cœur qui bat vite, mains moites, pensées qui s'emballe) est la première étape pour apprendre à le réguler.`
  },
  {
    id: 'art-fatigue-1',
    section: 'understand',
    type: 'Article',
    title: "Fatigue mentale : quand le cerveau sature",
    duration: '4 min',
    tags: ['fatigue'],
    isRead: false,
    content: `La fatigue mentale n'est pas juste "être fatigué". C'est un état d'épuisement cognitif qui survient après une période prolongée d'activité intellectuelle intense ou de stress émotionnel.\n\nSignes courants :\n- Difficulté à se concentrer\n- Irritabilité\n- Perte de motivation\n- Sommeil non réparateur\n\nPour récupérer, le repos ne suffit pas toujours. Il faut offrir à son cerveau de vraies pauses : marcher sans téléphone, regarder l'horizon, pratiquer une activité manuelle.`
  },
  
  // Section: D’autres vivent la même chose
  {
    id: 'tem-marie',
    section: 'testimonials',
    type: 'Témoignage',
    title: "Marie, 22 ans : “Je pensais être seule”",
    duration: '5 min',
    tags: ['isolement', 'anxiété'],
    isRead: false,
    content: `Pendant longtemps, j'ai cru que j'étais la seule à ressentir ce vide. Je voyais mes amis sortir, rire, poster des stories, et je me sentais en décalage complet.\n\n"Pourquoi eux y arrivent et pas moi ?" C'était ma phrase boucle.\n\nUn jour, j'ai osé en parler à une amie proche. À ma grande surprise, elle a fondu en larmes. Elle vivait exactement la même chose mais le cachait aussi. Ce jour-là, j'ai compris que l'isolement est souvent une illusion que notre anxiété construit.`
  },
  {
    id: 'tem-thomas',
    section: 'testimonials',
    type: 'Témoignage',
    title: "Thomas, 23 ans : surmonter l'anxiété",
    duration: '4 min',
    tags: ['anxiété', 'stress'],
    isRead: false,
    content: `L'anxiété sociale me paralysait. Aller en cours était une épreuve. J'avais l'impression que tout le monde me jugeait.\n\nJ'ai commencé par des petits défis : demander l'heure à un inconnu, lever la main une fois en cours. C'était terrifiant au début.\n\nCe qui m'a aidé, c'est d'accepter que je ne serai jamais le plus extraverti de la bande, et que c'est OK. Aujourd'hui, j'ai toujours un peu le trac, mais il ne m'empêche plus de vivre.`
  },

  // Section: Prendre un temps pour soi
  {
    id: 'aud-resp',
    section: 'practice',
    type: 'Audio',
    title: "Respiration guidée",
    duration: '5 min',
    tags: ['stress', 'anxiété'],
    isRead: false,
    content: `(Audio en cours de lecture...)\n\nInstallez-vous confortablement. Fermez les yeux. Inspirez profondément par le nez en gonflant le ventre... 1, 2, 3, 4. Bloquez... 1, 2. Expirez doucement par la bouche... 1, 2, 3, 4, 5, 6.`
  },
  {
    id: 'aud-anx',
    section: 'practice',
    type: 'Audio',
    title: "Gérer l’anxiété au quotidien",
    duration: '12 min',
    tags: ['anxiété', 'fatigue'],
    isRead: false,
    content: `(Podcast audio)\n\nDans cet épisode, nous explorons des techniques simples pour désamorcer une crise d'angoisse naissante. L'ancrage est une méthode puissante : nommez 5 objets que vous voyez, 4 que vous pouvez toucher, 3 que vous entendez...`
  }
];

const HELP_DATA = [
  {
    id: 'nightline',
    category: 'immediate',
    name: "Nightline",
    shortDesc: "Des étudiants formés pour t'écouter",
    fullDesc: "Nightline est un service d'écoute nocturne par et pour les étudiants. Tu peux parler de tout ce qui te préoccupe (stress, études, solitude, vie perso) à un autre étudiant formé à l'écoute active, dans un cadre bienveillant, confidentiel et sans jugement.",
    hours: "21h - 2h30",
    fullHours: "Ouvert tous les soirs de 21h à 2h30 du matin (sauf vacances universitaires).",
    badges: ["Tchat & Tel", "Anonyme", "Gratuit", "Étudiants"],
    whenToContact: "Quand tu te sens seul·e le soir, que tu as besoin de vider ton sac avant de dormir, ou que le stress des études t'empêche de trouver le sommeil.",
    phone: "01 88 32 12 32",
    website: "https://nightline.fr"
  },
  {
    id: '3114',
    category: 'immediate',
    name: "3114",
    shortDesc: "Numéro national de prévention suicide",
    fullDesc: "Le 3114 est le numéro national de prévention du suicide. Des professionnels de santé (infirmiers, psychologues) te répondent 24h/24 et 7j/7 pour t'écouter, évaluer la situation et t'orienter si nécessaire.",
    hours: "24h/24 • 7j/7",
    fullHours: "Disponible 24h/24 et 7j/7.",
    badges: ["Urgence", "Pro", "Gratuit", "Confidentiel"],
    whenToContact: "Si tu as des idées noires, que tu penses à la mort, ou que tu es inquiet·e pour un·e proche. C'est une ligne de crise professionnelle.",
    phone: "3114",
    website: "https://3114.fr"
  },
  {
    id: 'fil-sante',
    category: 'student',
    name: "Fil Santé Jeunes",
    shortDesc: "Information et écoute pour les 12-25 ans",
    fullDesc: "Fil Santé Jeunes est un service complet d'information et d'écoute. Ils abordent tous les sujets : santé mentale, sexualité, addictions, vie affective. Tu peux les contacter par téléphone, chat ou forum.",
    hours: "9h - 23h",
    fullHours: "Tous les jours de 9h à 23h.",
    badges: ["12-25 ans", "Généraliste", "Gratuit"],
    whenToContact: "Pour poser une question sur ta santé, comprendre ce qui t'arrive ou parler à un professionnel sans jugement.",
    phone: "0 800 235 236",
    website: "https://filsantejeunes.com"
  },
  {
    id: 'sante-psy',
    category: 'student',
    name: "Santé Psy Étudiant",
    shortDesc: "8 séances gratuites avec un psy",
    fullDesc: "Un dispositif gouvernemental qui permet à tout étudiant de bénéficier jusqu'à 8 séances gratuites avec un psychologue partenaire, sans avance de frais. Il suffit d'une ordonnance de ton médecin ou du service de santé universitaire.",
    hours: "Sur RDV",
    fullHours: "Selon les disponibilités des psychologues partenaires.",
    badges: ["Dispositif État", "Gratuit", "Suivi"],
    whenToContact: "Quand tu sens que tu as besoin d'un suivi régulier et structuré, au-delà d'une simple écoute ponctuelle.",
    phone: null,
    website: "https://santepsy.etudiant.gouv.fr"
  }
];

// --- SCREEN WRAPPER ---
const Screen = ({ 
  children, 
  bottomBar,
  className 
}: { 
  children: React.ReactNode; 
  bottomBar?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full h-full relative flex flex-col overflow-hidden bg-[#F8F9F7]", className)}>
      <div className={cn(
        "flex-1 w-full overflow-y-auto no-scrollbar",
        bottomBar ? "pb-[80px]" : "pb-6"
      )}>
        {children}
      </div>
      {bottomBar}
    </div>
  );
};

// --- SCREENS ---

// 01 - Accueil
const HomeScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const quickActions = [
    { label: 'Comprendre', icon: BookOpen, color: 'bg-[#9EB7C4]', target: 'learn' },
    { label: 'Parler', icon: HeartHandshake, color: 'bg-[#B9A7BB]', target: 'help' },
    { label: 'Respirer', icon: Volume2, color: 'bg-[#A5C8B2]', target: 'learn' }, // Redirects to learn/practice
  ];

  return (
    <Screen bottomBar={<BottomBar activeTab="home" onNavigate={onNavigate} />}>
      {/* Immersive Header */}
      <div className="pt-8 pb-6 px-4 flex flex-col items-center text-center bg-gradient-to-b from-[#F8F9F7] via-white to-[#F8F9F7]">
        <BrandLogo size="small" className="mb-6 w-8 h-8" />
        
        <H1 className="mb-2 text-[32px]">Bonjour, Sarah</H1>
        <TextBody className="text-[#5F6368] text-[16px]">Comment te sens-tu aujourd’hui ?</TextBody>
      </div>

      <div className="px-4 space-y-8">
        {/* Main Card: Ton Moment */}
        <Card className="p-6 bg-[#1F1F1F] text-white relative overflow-hidden shadow-lg" onClick={() => onNavigate('checkin')}>
          <div className="relative z-10 flex flex-col items-center text-center">
             <div className="mb-4 p-3 rounded-full bg-white/10 text-white backdrop-blur-sm">
                <Calendar size={24} />
             </div>
             <H2 className="text-white text-[22px] mb-2">Ton moment</H2>
             <TextBody className="text-white/70 mb-8 font-light">2 minutes pour toi, maintenant.</TextBody>
             
             <Button variant="primary" className="w-full bg-[#F2B9A0] text-[#1F1F1F] border-none h-14 text-[18px] shadow-[0_4px_14px_rgba(242,185,160,0.4)]">
               Commencer
             </Button>
          </div>
          
          {/* Subtle Texture/Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F] to-[#2D3136] z-0"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#7EA38B]/10 rounded-full blur-3xl pointer-events-none"></div>
        </Card>

        {/* Quick Actions Bar */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
           {quickActions.map((action, i) => (
             <button
               key={i}
               onClick={() => onNavigate(action.target)}
               className="flex items-center gap-3 pl-2 pr-5 py-2 bg-white border border-[#E6E7E3] rounded-full shadow-sm active:scale-95 transition-transform whitespace-nowrap shrink-0"
             >
               <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", action.color)}>
                 <action.icon size={16} />
               </div>
               <span className="font-['Manrope'] font-medium text-[#1F1F1F] text-[15px]">{action.label}</span>
             </button>
           ))}
        </div>

        {/* Pour toi aujourd'hui */}
        <div className="pb-4">
          <H2 className="mb-4 text-[20px] px-1">Pour toi aujourd’hui</H2>
          
          <div className="space-y-4">
            <Card className="flex items-center p-4 gap-4 active:scale-[0.98] transition-transform cursor-pointer" onClick={() => onNavigate('learn')}>
              <img 
                src="https://images.unsplash.com/photo-1766832858735-b3740223153e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" 
                className="w-16 h-16 rounded-[12px] object-cover" 
                alt="Nature"
              />
              <div className="flex-1">
                <h4 className="font-['Manrope'] font-medium text-[#1F1F1F] text-[16px]">Respiration guidée</h4>
                <p className="font-['Inter'] text-[13px] text-[#5F6368] mt-1">5 min • Relaxation</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-[#F8F9F7] flex items-center justify-center text-[#1F1F1F]">
                <PlayCircle size={20} />
              </button>
            </Card>

            {/* Micro-card bienveillante */}
            <div className="px-4 py-6 rounded-[20px] bg-[#F8F9F7] border border-[#E6E7E3] text-center border-dashed">
              <p className="font-['Manrope'] text-[#5F6368] text-[14px] italic leading-relaxed">
                “Tu n’as rien à réussir ici. Juste être là.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
};

// 02-04 - Checkin Flow
const CheckinScreen = ({ onComplete, onBack }: { onComplete: (result: 'good' | 'support', concerns: string[]) => void, onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [energy, setEnergy] = useState(50);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const concernOptions = [
    { id: 'work', label: 'Travail', icon: BarChart2, color: 'bg-[#A5C8B2]' },
    { id: 'family', label: 'Famille', icon: HeartHandshake, color: 'bg-[#F2B9A0]' },
    { id: 'health', label: 'Santé', icon: Activity, color: 'bg-[#9EB7C4]' },
    { id: 'future', label: 'Avenir', icon: Calendar, color: 'bg-[#B9A7BB]' },
    { id: 'none', label: 'Rien de spécial', icon: CheckCircle, color: 'bg-[#7EA38B]' },
  ];

  const moodOptions = [
    { label: 'Calme', type: 'good' },
    { label: 'Motivé', type: 'good' },
    { label: 'Reconnaissant', type: 'good' },
    { label: 'Excité', type: 'good' },
    { label: 'Anxieux', type: 'support' },
    { label: 'Fatigué', type: 'support' },
    { label: 'Triste', type: 'support' },
    { label: 'Perdu', type: 'support' },
  ];

  const handleConcernToggle = (id: string) => {
    if (id === 'none') {
      // Exclusive "None"
      if (selectedConcerns.includes('none')) {
        setSelectedConcerns([]);
      } else {
        setSelectedConcerns(['none']);
      }
    } else {
      // Toggle normal option
      let newConcerns = [...selectedConcerns];
      if (newConcerns.includes('none')) {
        newConcerns = [];
      }
      
      if (newConcerns.includes(id)) {
        newConcerns = newConcerns.filter(c => c !== id);
      } else {
        newConcerns.push(id);
      }
      setSelectedConcerns(newConcerns);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Logic for result
      // "Support" if:
      // - 2+ specific themes selected
      // - OR Energy < 30
      // - OR 1 specific theme AND Energy < 30 (covered by Energy < 30)
      
      const specificConcernsCount = selectedConcerns.filter(c => c !== 'none').length;
      const isSupport = specificConcernsCount >= 2 || energy < 30;

      onComplete(isSupport ? 'support' : 'good', selectedConcerns);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  return (
    <Screen>
      <div className="min-h-full flex flex-col">
        <TopBar 
          title={`Check-in ${step}/3`} 
          showBack 
          onBack={prevStep}
          rightAction={<button onClick={onBack}><X size={24} className="text-[#9AA0A6]" /></button>}
        />
        {/* Progress Bar */}
        <div className="h-1 bg-[#F0F0F0] w-full shrink-0">
          <motion.div 
            className="h-full bg-[#7EA38B]" 
            initial={{ width: 0 }} 
            animate={{ width: `${(step / 3) * 100}%` }} 
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="flex-1 px-6 pt-8 flex flex-col pb-10">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            {step === 1 && (
              <>
                <H1 className="mb-4 text-[28px]">Comment est votre énergie ?</H1>
                <TextBody className="text-[#5F6368] mb-12">Déplacez le curseur selon votre ressenti du moment.</TextBody>
                
                <div className="py-10 px-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={energy} 
                    onChange={(e) => setEnergy(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#E6E7E3] rounded-lg appearance-none cursor-pointer accent-[#7EA38B]"
                  />
                  <div className="flex justify-between mt-4 text-[13px] text-[#9AA0A6] font-medium font-['Inter']">
                    <span>Faible</span>
                    <span>Au top</span>
                  </div>
                  <div className="mt-8 text-center text-[40px] font-medium font-['Manrope'] text-[#1F1F1F]">
                    {energy}%
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <H1 className="mb-4 text-[28px]">Qu'est-ce qui vous préoccupe ?</H1>
                <TextBody className="text-[#5F6368] mb-8">Sélectionnez ce qui s'applique.</TextBody>
                
                <div className="space-y-3">
                  {concernOptions.map((item) => {
                    const isSelected = selectedConcerns.includes(item.id);
                    return (
                      <button 
                        key={item.id}
                        onClick={() => handleConcernToggle(item.id)}
                        className={cn(
                          "w-full p-4 rounded-[20px] border flex items-center gap-4 transition-all active:scale-[0.99] font-['Inter']",
                          isSelected 
                            ? "bg-[#7EA38B] border-[#7EA38B] shadow-md translate-y-[-2px]" 
                            : "bg-white border-[#E6E7E3] text-[#1F1F1F] hover:bg-[#F8F9F7]"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                          isSelected 
                            ? "bg-white/20 text-white" 
                            : cn(item.color, "text-[#1F1F1F]")
                        )}>
                          <item.icon size={20} />
                        </div>
                        <span className={cn(
                          "font-semibold text-[16px]",
                          isSelected ? "text-white" : "text-[#1F1F1F]"
                        )}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <H1 className="mb-4 text-[28px]">Un mot pour décrire l'instant ?</H1>
                <div className="flex flex-wrap gap-3">
                  {moodOptions.map((mood) => (
                    <button 
                      key={mood.label}
                      onClick={() => setSelectedMood(mood.label)}
                      className={cn(
                        "px-5 py-3 rounded-full border transition-colors font-['Inter']",
                        selectedMood === mood.label
                          ? "bg-[#1F1F1F] text-white border-[#1F1F1F]"
                          : "bg-white border-[#E6E7E3] text-[#1F1F1F] hover:bg-[#F8F9F7]"
                      )}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          <Button 
            onClick={nextStep} 
            fullWidth 
            variant="primary" 
            className={cn("bg-[#F2B9A0] text-[#1F1F1F] mt-auto transition-opacity", step === 2 && selectedConcerns.length === 0 && "opacity-50 pointer-events-none")}
          >
            {step === 3 ? 'Terminer' : 'Continuer'}
          </Button>
        </div>
      </div>
    </Screen>
  );
};

// 05-06 - Result Screens
const ResultScreen = ({ type, concerns = [], onNavigate }: { type: 'good' | 'support', concerns?: string[], onNavigate: (screen: string) => void }) => {
  const isGood = type === 'good';
  
  const getDynamicText = () => {
    if (isGood) {
      return "Votre énergie est au beau fixe. Profitez de ce moment pour explorer nos contenus.";
    }

    // Dynamic Text Generation for Support
    const labels = concerns.filter(c => c !== 'none');
    
    if (labels.length === 0) {
      return "Il semble que ce soit une journée difficile. Nous avons des ressources pour vous aider.";
    }

    // Map IDs to text
    const mapText: Record<string, string> = {
      'work': 'ton travail',
      'family': 'la famille',
      'health': 'la santé',
      'future': "ce qui t'attend"
    };

    if (labels.length === 1) {
      return `Tu sembles préoccupé·e par ${mapText[labels[0]]}. C'est important de prendre du recul pour mieux gérer cette situation.`;
    }

    if (labels.includes('work') && labels.includes('future')) {
      return "Tu sembles préoccupé·e par ton travail et par ce qui t’attend. Ces inquiétudes peuvent peser sur ton énergie et ton moral. C’est compréhensible dans une période de transition.";
    }

    if (labels.includes('family') && labels.includes('health')) {
      return "Les préoccupations liées à la famille et à la santé sont souvent émotionnellement lourdes. Le fait de les identifier est déjà une première étape importante.";
    }

    // Generic Fallback for multiple items
    const textParts = labels.map(l => mapText[l]).join(' et ');
    return `Les préoccupations liées à ${textParts} peuvent s'accumuler. Il est normal de se sentir dépassé, mais vous n'êtes pas seul·e.`;
  };

  return (
    <Screen className="bg-white">
      <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "w-32 h-32 rounded-full flex items-center justify-center mb-8",
            isGood ? "bg-[#7EA38B]/20" : "bg-[#6B9BB8]/20"
          )}
        >
          {isGood ? <BarChart2 size={48} className="text-[#7EA38B]" /> : <HeartHandshake size={48} className="text-[#6B9BB8]" />}
        </motion.div>
        
        <H1 className="mb-4 text-[28px]">
          {isGood ? "Tout semble aller bien !" : "Besoin d'un peu de soutien ?"}
        </H1>
        
        <TextBody className="text-[#5F6368] mb-12 max-w-xs mx-auto">
          {getDynamicText()}
        </TextBody>

        <div className="w-full space-y-4">
          <Button onClick={() => onNavigate('learn')} fullWidth variant="primary" className="bg-[#F2B9A0] text-[#1F1F1F]">
             {isGood ? "Explorer les contenus" : "Voir les ressources"}
          </Button>
          <Button onClick={() => onNavigate('home')} fullWidth variant="ghost">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </Screen>
  );
};

// 07-11 - Learn/Comprendre
const LearnScreen = ({ onNavigate, onOpenContent }: { onNavigate: (screen: string) => void, onOpenContent: (content: any) => void }) => {
  const [filter, setFilter] = useState('Tout');
  const filters = ['Tout', 'Stress', 'Fatigue', 'Anxiété', 'Isolement'];

  // Filter Logic
  const filteredContent = CONTENT_DATA.filter(item => {
    if (filter === 'Tout') return true;
    return item.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()));
  });

  // Group by Section
  const sections = {
    understand: filteredContent.filter(i => i.section === 'understand'),
    testimonials: filteredContent.filter(i => i.section === 'testimonials'),
    practice: filteredContent.filter(i => i.section === 'practice'),
  };

  const ArticleItem = ({ item }: { item: any }) => (
    <Card onClick={() => onOpenContent(item)} className="flex p-4 gap-4 items-center mb-3 transition-all hover:bg-gray-50 active:scale-[0.99]">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
        item.type === 'Audio' ? "bg-[#B9A7BB]/20 text-[#B9A7BB]" : "bg-[#9EB7C4]/20 text-[#6B9BB8]"
      )}>
        {item.type === 'Audio' ? <Volume2 size={20} /> : <BookOpen size={20} />}
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-bold text-[#9AA0A6] tracking-wide">{item.type}</span>
          {item.isRead && <span className="text-[10px] text-[#7EA38B] bg-[#7EA38B]/10 px-2 py-0.5 rounded-full">Lu</span>}
        </div>
        <h3 className="font-['Manrope'] font-medium text-[#1F1F1F] text-[15px] leading-tight mb-1">{item.title}</h3>
        <span className="text-[12px] text-[#5F6368] flex items-center gap-1">
          <Clock size={12} /> {item.duration}
        </span>
      </div>
      <ChevronRight size={20} className="text-[#9AA0A6]" />
    </Card>
  );

  return (
    <Screen bottomBar={<BottomBar activeTab="learn" onNavigate={onNavigate} />}>
      <div className="pt-2">
        <div className="px-4 mb-4 mt-4">
          <H1 className="mb-2">Comprendre</H1>
          <TextBody className="text-[#5F6368]">Des ressources pour mieux te comprendre, à ton rythme.</TextBody>
        </div>

        {/* Contextual State Block - Only show if 'Tout' is selected to avoid clutter */}
        {filter === 'Tout' && (
          <div className="px-4 mb-6">
            <div className="bg-[#A5C8B2]/20 border border-[#A5C8B2]/30 p-4 rounded-[16px]">
              <p className="text-[14px] text-[#1F1F1F] leading-relaxed">
                <span className="font-semibold">État du moment :</span> Aujourd’hui, tu as mentionné te sentir préoccupé·e par le travail et l’avenir. Ces contenus pourraient t’aider.
              </p>
            </div>
          </div>
        )}

        {/* Sticky Filters */}
        <div className="sticky top-0 bg-[#F8F9F7] z-30 py-3 px-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-[#E6E7E3]/50 mb-4">
          {filters.map(f => (
            <Chip 
              key={f} 
              label={f} 
              active={filter === f} 
              onClick={() => setFilter(f)} 
            />
          ))}
        </div>

        <div className="px-4 pb-4 space-y-8">
          
          {/* Section 1 */}
          {sections.understand.length > 0 && (
            <section>
              <H2 className="text-[18px] mb-3">Comprendre ce que tu ressens</H2>
              {sections.understand.map(item => <ArticleItem key={item.id} item={item} />)}
              
              <div className="bg-white p-4 rounded-[16px] border border-[#E6E7E3] mt-2">
                <p className="text-[14px] text-[#5F6368] italic">
                  “Mettre des mots sur ce que tu ressens est souvent la première étape pour aller mieux.”
                </p>
              </div>
            </section>
          )}

          {/* Section 2 */}
          {sections.testimonials.length > 0 && (
            <section>
              <H2 className="text-[18px] mb-3">D’autres vivent la même chose</H2>
              {sections.testimonials.map(item => <ArticleItem key={item.id} item={item} />)}
              
              <div className="mt-2 flex items-center gap-3 p-3 bg-[#6B9BB8]/10 rounded-[12px]">
                <Heart size={20} className="text-[#6B9BB8]" />
                <p className="text-[13px] text-[#1F1F1F]">Tu n’es pas seul·e. Beaucoup traversent des moments similaires.</p>
              </div>
            </section>
          )}

          {/* Section 3 */}
          {(sections.practice.length > 0 || filter === 'Tout') && (
            <section>
              {sections.practice.length > 0 && <H2 className="text-[18px] mb-3">Prendre un temps pour soi</H2>}
              {sections.practice.map(item => <ArticleItem key={item.id} item={item} />)}

              {/* Mini Breathing Card - Only show on 'Tout' or 'Stress'/'Anxiété' */}
              {['Tout', 'Stress', 'Anxiété'].includes(filter) && (
                <div className="bg-[#1F1F1F] rounded-[20px] p-5 text-white mt-3 relative overflow-hidden">
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-[16px] mb-1">Respiration rapide</h3>
                      <p className="text-white/70 text-[13px]">3 étapes pour calmer le jeu</p>
                    </div>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1F1F1F]">
                      <PlayCircle size={20} />
                    </button>
                  </div>
                  <div className="flex gap-2 mt-4 text-[12px] font-medium text-white/60">
                    <span className="px-3 py-1 bg-white/10 rounded-full">Inspirer</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full">Bloquer</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full">Expirer</span>
                  </div>
                </div>
              )}
            </section>
          )}

          <div className="pt-4 pb-8 text-center px-4">
            <p className="text-[11px] text-[#9AA0A6]">
              Ces contenus sont conçus avec des professionnels de la santé mentale. Ils ne remplacent pas un suivi médical.
            </p>
          </div>
        </div>
      </div>
    </Screen>
  );
};

// New: Content Reader Screen
const ContentReaderScreen = ({ content, onBack }: { content: any, onBack: () => void }) => {
  if (!content) return null;

  return (
    <Screen className="bg-white">
      <TopBar 
        showBack 
        onBack={onBack}
        rightAction={<button className="text-[#9AA0A6]"><BookOpen size={24} /></button>} 
      />
      
      <div className="px-6 py-4">
        <div className="mb-6">
           <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#F8F9F7] text-[#5F6368] text-[12px] font-bold uppercase tracking-wider">
                {content.type}
              </span>
              <span className="text-[13px] text-[#9AA0A6] flex items-center gap-1">
                <Clock size={14} /> {content.duration}
              </span>
           </div>
           <H1 className="text-[28px]">{content.title}</H1>
        </div>

        <div className="prose prose-lg text-[#1F1F1F] font-['Inter'] leading-loose whitespace-pre-wrap">
          {content.content}
        </div>

        <div className="mt-12 mb-8 space-y-4">
          <Button fullWidth onClick={onBack} variant="primary">
            J'ai terminé
          </Button>
          <Button fullWidth onClick={onBack} variant="secondary">
            Enregistrer pour plus tard
          </Button>
        </div>
      </div>
    </Screen>
  );
};


// 12 - Aide
const HelpScreen = ({ onNavigate, resultType, onOpenResource }: { onNavigate: (screen: string) => void, resultType: 'good' | 'support', onOpenResource: (resource: any) => void }) => {
  const isSupportNeeded = resultType === 'support';

  const SectionHeader = ({ icon: Icon, title, subtitle }: any) => (
    <div className="flex items-start gap-3 mb-4 mt-6">
      <div className="w-8 h-8 rounded-full bg-[#E6E7E3] flex items-center justify-center text-[#5F6368] shrink-0">
        <Icon size={16} />
      </div>
      <div>
        <h2 className="text-[18px] font-medium font-['Manrope'] text-[#1F1F1F] leading-tight">{title}</h2>
        <p className="text-[13px] text-[#5F6368] mt-1 leading-snug">{subtitle}</p>
      </div>
    </div>
  );

  const ResourceCard = ({ resource }: { resource: any }) => (
    <Card className="p-4 mb-3 active:scale-[0.99] transition-transform">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-[16px] font-['Manrope'] text-[#1F1F1F]">{resource.name}</h3>
          <p className="text-[13px] text-[#5F6368] mt-1 line-clamp-2">{resource.shortDesc}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {resource.badges.slice(0, 3).map((badge: string, i: number) => (
          <span key={i} className="text-[10px] font-medium text-[#5F6368] bg-[#F8F9F7] px-2 py-1 rounded-md border border-[#E6E7E3]">
            {badge}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#F8F9F7]">
        <span className="text-[11px] font-medium text-[#7EA38B] bg-[#7EA38B]/10 px-2 py-1 rounded-md flex items-center gap-1">
          <Clock size={10} /> {resource.hours}
        </span>
        <div className="flex gap-2">
           <Button onClick={() => onOpenResource(resource)} variant="secondary" className="h-8 px-3 text-[12px] font-medium">
             Fiche
           </Button>
           {resource.phone && (
             <Button variant="primary" className="h-8 px-4 text-[12px] font-medium bg-[#F2B9A0]">
               Appeler
             </Button>
           )}
        </div>
      </div>
    </Card>
  );

  return (
    <Screen bottomBar={<BottomBar activeTab="help" onNavigate={onNavigate} />}>
      <div className="pt-2 px-4 pb-4">
         <div className="mb-6 mt-4">
          <H1 className="mb-2">Aide & Soutien</H1>
          <TextBody className="text-[#5F6368] mt-2">
            Tu n’as pas à rester seul·e. Des professionnels et bénévoles sont là pour t'écouter.
          </TextBody>
        </div>

        {/* Contextual Warning Block */}
        {isSupportNeeded && (
          <div className="bg-[#FFF0F0] border border-[#FFD9D9] p-4 rounded-[16px] flex gap-3 mb-6 animate-pulse-slow">
             <AlertTriangle size={24} className="text-[#D32F2F] shrink-0 mt-1" />
             <div>
               <h3 className="font-bold text-[#D32F2F] text-[15px] mb-1">Besoin de parler ?</h3>
               <p className="text-[13px] text-[#1F1F1F] leading-snug">
                 Tu as indiqué traverser une période difficile. Ces services peuvent t’aider dès maintenant.
               </p>
             </div>
          </div>
        )}

        <div className="space-y-2 pb-4">
          
          <SectionHeader 
            icon={Moon} 
            title="Écoute immédiate" 
            subtitle="Pour parler à quelqu'un maintenant, sans jugement." 
          />
          {HELP_DATA.filter(r => r.category === 'immediate').map(r => (
            <ResourceCard key={r.id} resource={r} />
          ))}

          <SectionHeader 
            icon={HeartHandshake} 
            title="Accompagnement étudiant" 
            subtitle="Des dispositifs pensés spécifiquement pour tes besoins." 
          />
          {HELP_DATA.filter(r => r.category === 'student').map(r => (
            <ResourceCard key={r.id} resource={r} />
          ))}

          {/* Emergency Footer */}
          <div className="mt-8 p-4 rounded-[16px] bg-[#F8F9F7] border border-[#E6E7E3] text-center">
            <p className="text-[12px] text-[#9AA0A6] mb-2">En cas d'urgence vitale</p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs">15</div>
                <span className="font-bold text-[#1F1F1F]">SAMU</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs">112</div>
                <span className="font-bold text-[#1F1F1F]">Urgences</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Screen>
  );
};

// New: Help Detail Screen
const HelpDetailScreen = ({ resource, onBack }: { resource: any, onBack: () => void }) => {
  if (!resource) return null;

  return (
    <Screen className="bg-white">
      <TopBar 
        showBack 
        onBack={onBack}
        title="Fiche Ressource"
      />
      
      <div className="px-6 py-6 pb-24"> {/* Added padding bottom for fixed footer */}
        <div className="flex justify-center mb-6">
           <div className="w-20 h-20 rounded-full bg-[#F8F9F7] flex items-center justify-center text-[#1F1F1F] shadow-inner">
             <HeartHandshake size={32} className="text-[#7EA38B]" />
           </div>
        </div>

        <H1 className="text-center text-[28px] mb-2">{resource.name}</H1>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
           {resource.badges.map((badge: string, i: number) => (
             <span key={i} className="px-3 py-1 rounded-full bg-[#F2B9A0]/10 text-[#D98C6C] text-[12px] font-bold uppercase tracking-wider border border-[#F2B9A0]/20">
               {badge}
             </span>
           ))}
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="font-bold text-[#1F1F1F] mb-2 flex items-center gap-2">
              <Info size={16} /> À propos
            </h3>
            <p className="text-[#5F6368] text-[15px] leading-relaxed">
              {resource.fullDesc}
            </p>
          </section>

          <section>
            <h3 className="font-bold text-[#1F1F1F] mb-2 flex items-center gap-2">
              <Clock size={16} /> Horaires
            </h3>
            <p className="text-[#5F6368] text-[15px]">
              {resource.fullHours}
            </p>
          </section>

          <div className="bg-[#A5C8B2]/20 p-5 rounded-[16px] border border-[#A5C8B2]/30 mt-4">
             <h3 className="font-bold text-[#1F1F1F] mb-2 text-[15px]">Quand contacter ce service ?</h3>
             <p className="text-[#1F1F1F] text-[14px] italic leading-relaxed opacity-80">
               “{resource.whenToContact}”
             </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E6E7E3] flex gap-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {resource.website && (
          <Button variant="secondary" className="flex-1" icon={Globe}>
            Site web
          </Button>
        )}
        {resource.phone && (
          <Button variant="primary" className="flex-[2] bg-[#F2B9A0]" icon={Phone}>
            Appeler {resource.phone}
          </Button>
        )}
      </div>
    </Screen>
  );
};

// 13 - Settings
const SettingsScreen = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const SettingItem = ({ icon: Icon, label, value, onClick }: any) => (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center justify-between py-4 border-b border-[#E6E7E3] last:border-0",
        onClick && "cursor-pointer active:opacity-70 transition-opacity"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-[#5F6368]" />
        <span className="text-[#1F1F1F] font-medium font-['Inter']">{label}</span>
      </div>
      <div className="text-[#9AA0A6] flex items-center gap-2">
        <span className="text-[14px] font-['Inter']">{value}</span>
        <ChevronRight size={16} />
      </div>
    </div>
  );

  return (
    <Screen bottomBar={<BottomBar activeTab="settings" onNavigate={onNavigate} />}>
      <div className="pt-2 px-4 pb-4">
        <div className="mb-8 mt-4">
          <H1>Réglages</H1>
        </div>

        <Card className="p-4 mb-6">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#A5C8B2] flex items-center justify-center text-[#1F1F1F] font-bold text-xl font-['Manrope']">
                S
              </div>
              <div>
                <h3 className="font-bold text-[#1F1F1F] font-['Manrope']">Sarah Martin</h3>
                <TextBody className="text-[14px] text-[#5F6368]">sarah.m@email.com</TextBody>
              </div>
           </div>
           <Button variant="secondary" fullWidth onClick={() => onNavigate('profile-edit')}>Modifier le profil</Button>
        </Card>

        <section>
          <h3 className="text-[14px] font-semibold text-[#9AA0A6] uppercase tracking-wider mb-2 pl-2 font-['Inter']">Compte</h3>
          <Card className="px-4">
             <SettingItem icon={Bell} label="Notifications" value="Activées" onClick={() => onNavigate('settings-notifications')} />
             <SettingItem icon={Lock} label="Confidentialité" onClick={() => onNavigate('settings-privacy')} />
             <SettingItem icon={CreditCard} label="Abonnement" value="Gratuit" onClick={() => onNavigate('settings-subscription')} />
          </Card>
        </section>
        
        <section className="mt-6">
          <h3 className="text-[14px] font-semibold text-[#9AA0A6] uppercase tracking-wider mb-2 pl-2 font-['Inter']">Application</h3>
          <Card className="px-4">
             <SettingItem icon={Paintbrush} label="Apparence" value="Clair" onClick={() => onNavigate('settings-appearance')} />
             <SettingItem icon={Languages} label="Langue" value="Français" onClick={() => onNavigate('settings-language')} />
             <SettingItem icon={Info} label="À propos" onClick={() => onNavigate('settings-about')} />
          </Card>
        </section>

        <div className="flex justify-center mt-8 mb-4">
           <BrandLogo size="small" className="opacity-50 grayscale" />
        </div>
      </div>
    </Screen>
  );
};

// --- SETTINGS SUB-SCREENS ---

const ProfileEditScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <Screen className="bg-white">
      <TopBar title="Modifier le profil" showBack onBack={onBack} />
      <div className="px-6 pt-6 pb-6 flex flex-col h-full">
         <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#A5C8B2] flex items-center justify-center text-[#1F1F1F] font-bold text-3xl font-['Manrope']">
                S
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1F1F1F] rounded-full text-white flex items-center justify-center border-2 border-white">
                 <Settings size={14} /> 
              </button>
            </div>
         </div>

         <div className="space-y-4 flex-1">
            <div>
              <label className="block text-[13px] font-medium text-[#5F6368] mb-1 ml-1">Prénom</label>
              <input type="text" defaultValue="Sarah" className="w-full h-12 px-4 rounded-[12px] bg-[#F8F9F7] border border-[#E6E7E3] text-[#1F1F1F] focus:outline-none focus:border-[#7EA38B]" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#5F6368] mb-1 ml-1">Nom</label>
              <input type="text" defaultValue="Martin" className="w-full h-12 px-4 rounded-[12px] bg-[#F8F9F7] border border-[#E6E7E3] text-[#1F1F1F] focus:outline-none focus:border-[#7EA38B]" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#5F6368] mb-1 ml-1">Email</label>
              <input type="email" defaultValue="sarah.m@email.com" className="w-full h-12 px-4 rounded-[12px] bg-[#F8F9F7] border border-[#E6E7E3] text-[#1F1F1F] focus:outline-none focus:border-[#7EA38B]" />
            </div>
         </div>

         <div className="mt-auto pb-6">
            <p className="text-center text-[12px] text-[#9AA0A6] mb-4 flex items-center justify-center gap-2">
              <Lock size={12} /> Tes informations restent privées.
            </p>
            <Button fullWidth onClick={onBack} variant="primary">Enregistrer</Button>
         </div>
      </div>
    </Screen>
  );
};

const NotificationsScreen = ({ onBack }: { onBack: () => void }) => {
  const [toggles, setToggles] = useState({ daily: true, content: true, support: false });

  const ToggleItem = ({ label, desc, isOn, onToggle }: any) => (
    <div className="flex items-center justify-between py-4 border-b border-[#E6E7E3] last:border-0">
      <div className="pr-4">
        <div className="text-[#1F1F1F] font-medium font-['Inter'] text-[15px]">{label}</div>
        <div className="text-[#9AA0A6] text-[13px] leading-snug mt-0.5">{desc}</div>
      </div>
      <button 
        onClick={onToggle}
        className={cn(
          "w-12 h-7 rounded-full transition-colors relative shrink-0",
          isOn ? "bg-[#7EA38B]" : "bg-[#E6E7E3]"
        )}
      >
        <div className={cn(
          "absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
          isOn ? "left-[calc(100%-22px)]" : "left-1"
        )} />
      </button>
    </div>
  );

  return (
    <Screen className="bg-white">
      <TopBar title="Notifications" showBack onBack={onBack} />
      <div className="px-6 pt-2 pb-6 flex flex-col h-full">
         <Card className="px-4">
            <ToggleItem 
              label="Rappels quotidiens" 
              desc="Un petit check-in pour suivre ton humeur." 
              isOn={toggles.daily} 
              onToggle={() => setToggles({...toggles, daily: !toggles.daily})}
            />
            <ToggleItem 
              label="Nouveaux contenus" 
              desc="Quand un article ou audio qui pourrait te plaire sort." 
              isOn={toggles.content} 
              onToggle={() => setToggles({...toggles, content: !toggles.content})}
            />
            <ToggleItem 
              label="Messages de soutien" 
              desc="Des petites pensées positives aléatoires." 
              isOn={toggles.support} 
              onToggle={() => setToggles({...toggles, support: !toggles.support})}
            />
         </Card>

         <div className="mt-auto pb-6">
            <Button fullWidth onClick={() => setToggles({ daily: false, content: false, support: false })} variant="ghost" className="text-[#D32F2F] hover:bg-red-50">
              Tout désactiver
            </Button>
         </div>
      </div>
    </Screen>
  );
};

const PrivacyScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <Screen className="bg-white">
      <TopBar title="Confidentialité" showBack onBack={onBack} />
      <div className="px-6 pt-4 pb-6 flex flex-col h-full overflow-y-auto">
         <div className="space-y-4 mb-8">
            <div className="bg-[#F8F9F7] p-5 rounded-[16px] border border-[#E6E7E3]">
              <div className="flex items-center gap-3 mb-2">
                 <Shield size={20} className="text-[#7EA38B]" />
                 <h3 className="font-bold text-[#1F1F1F]">Anonymat garanti</h3>
              </div>
              <p className="text-[13px] text-[#5F6368] leading-relaxed">
                Nous ne demandons jamais ton nom complet ou ton adresse pour utiliser l'app. Ton profil est uniquement local.
              </p>
            </div>
            
            <div className="bg-[#F8F9F7] p-5 rounded-[16px] border border-[#E6E7E3]">
              <div className="flex items-center gap-3 mb-2">
                 <Lock size={20} className="text-[#6B9BB8]" />
                 <h3 className="font-bold text-[#1F1F1F]">Données chiffrées</h3>
              </div>
              <p className="text-[13px] text-[#5F6368] leading-relaxed">
                Tes réponses aux check-ins et ton journal sont chiffrés. Personne d'autre que toi ne peut les lire.
              </p>
            </div>

            <div className="bg-[#F8F9F7] p-5 rounded-[16px] border border-[#E6E7E3]">
              <div className="flex items-center gap-3 mb-2">
                 <X size={20} className="text-[#B9A7BB]" />
                 <h3 className="font-bold text-[#1F1F1F]">Pas de revente</h3>
              </div>
              <p className="text-[13px] text-[#5F6368] leading-relaxed">
                Tes données émotionnelles ne sont pas à vendre. Elles servent uniquement à personnaliser ton expérience.
              </p>
            </div>
         </div>

         <div className="mt-auto pb-6 space-y-3">
            <Button fullWidth variant="secondary">Politique de confidentialité</Button>
            <Button fullWidth variant="ghost" className="text-[#D32F2F] hover:bg-red-50">Supprimer mes données</Button>
         </div>
      </div>
    </Screen>
  );
};

const SubscriptionScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <Screen className="bg-white">
      <TopBar title="Abonnement" showBack onBack={onBack} />
      <div className="px-6 pt-4 pb-6 flex flex-col h-full overflow-y-auto">
         <div className="text-center mb-8">
            <span className="bg-[#E6E7E3] text-[#5F6368] px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">
              Actuel
            </span>
            <H1 className="mt-4 mb-2">Plan Gratuit</H1>
            <TextBody className="text-[#5F6368]">Accès aux essentiels pour ton bien-être.</TextBody>
         </div>

         <Card className="p-0 mb-8 overflow-hidden border border-[#E6E7E3]">
            <div className="p-4 bg-[#F8F9F7] border-b border-[#E6E7E3] flex justify-between items-center">
               <span className="font-bold text-[#1F1F1F]">Fonctionnalités</span>
               <div className="flex gap-8 text-[13px] font-bold">
                  <span className="text-[#5F6368]">Gratuit</span>
                  <span className="text-[#7EA38B]">Premium</span>
               </div>
            </div>
            {[
              { label: "Check-in quotidien", free: true, prem: true },
              { label: "Contenus essentiels", free: true, prem: true },
              { label: "Suivi statistiques", free: false, prem: true },
              { label: "Parcours guidés", free: false, prem: true },
              { label: "Journal illimité", free: false, prem: true },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center p-4 border-b border-[#E6E7E3] last:border-0 text-[14px]">
                 <span className="text-[#1F1F1F] font-medium">{row.label}</span>
                 <div className="flex gap-12 pr-2">
                    {row.free ? <CheckCircle size={16} className="text-[#1F1F1F]" /> : <span className="w-4" />}
                    {row.prem ? <CheckCircle size={16} className="text-[#7EA38B]" /> : <span className="w-4" />}
                 </div>
              </div>
            ))}
         </Card>

         <div className="mt-auto pb-6">
            <div className="bg-[#7EA38B]/10 p-4 rounded-[16px] text-center mb-4">
              <p className="text-[#7EA38B] font-bold text-[18px]">4,99€ / mois</p>
              <p className="text-[12px] text-[#5F6368] mt-1">7 jours d'essai gratuit, annulable à tout moment.</p>
            </div>
            <Button fullWidth variant="primary" className="bg-[#7EA38B] text-white">Passer à Premium</Button>
         </div>
      </div>
    </Screen>
  );
};

const AppearanceScreen = ({ onBack }: { onBack: () => void }) => {
  const [theme, setTheme] = useState('light');
  
  const RadioOption = ({ id, label, icon: Icon }: any) => (
    <button 
      onClick={() => setTheme(id)}
      className="w-full flex items-center justify-between p-4 bg-white border-b border-[#E6E7E3] last:border-0 first:rounded-t-[16px] last:rounded-b-[16px]"
    >
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-full bg-[#F8F9F7] flex items-center justify-center text-[#5F6368]">
            <Icon size={20} />
         </div>
         <span className="font-medium text-[#1F1F1F]">{label}</span>
      </div>
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
        theme === id ? "border-[#7EA38B]" : "border-[#E6E7E3]"
      )}>
        {theme === id && <div className="w-3 h-3 rounded-full bg-[#7EA38B]" />}
      </div>
    </button>
  );

  return (
    <Screen>
       <TopBar title="Apparence" showBack onBack={onBack} />
       <div className="px-6 pt-6">
          <div className="border border-[#E6E7E3] rounded-[16px] bg-white shadow-sm">
             <RadioOption id="light" label="Clair" icon={Calendar} />
             <RadioOption id="dark" label="Sombre" icon={Moon} />
             <RadioOption id="system" label="Système" icon={Settings} />
          </div>

          <div className="mt-8 flex justify-center">
             <div className={cn(
               "w-48 h-64 rounded-[20px] shadow-lg transition-colors border-4 flex flex-col items-center justify-center p-4 gap-4",
               theme === 'dark' ? "bg-[#1F1F1F] border-[#333]" : "bg-white border-white"
             )}>
                <div className={cn("w-20 h-2 bg-current rounded-full opacity-20", theme === 'dark' ? "text-white" : "text-black")}></div>
                <div className={cn("w-32 h-32 rounded-full opacity-20", theme === 'dark' ? "bg-white" : "bg-black")}></div>
                <div className={cn("w-full h-10 rounded-full opacity-20", theme === 'dark' ? "bg-white" : "bg-black")}></div>
             </div>
          </div>
       </div>
    </Screen>
  );
};

const LanguageScreen = ({ onBack }: { onBack: () => void }) => {
  const [lang, setLang] = useState('fr');

  const RadioOption = ({ id, label, flag }: any) => (
    <button 
      onClick={() => setLang(id)}
      className="w-full flex items-center justify-between p-4 bg-white border-b border-[#E6E7E3] last:border-0 first:rounded-t-[16px] last:rounded-b-[16px]"
    >
      <div className="flex items-center gap-3">
         <span className="text-2xl">{flag}</span>
         <span className="font-medium text-[#1F1F1F]">{label}</span>
      </div>
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
        lang === id ? "border-[#7EA38B]" : "border-[#E6E7E3]"
      )}>
        {lang === id && <div className="w-3 h-3 rounded-full bg-[#7EA38B]" />}
      </div>
    </button>
  );

  return (
    <Screen>
       <TopBar title="Langue" showBack onBack={onBack} />
       <div className="px-6 pt-6">
          <div className="border border-[#E6E7E3] rounded-[16px] bg-white shadow-sm">
             <RadioOption id="fr" label="Français" flag="🇫🇷" />
             <RadioOption id="en" label="English" flag="🇬🇧" />
             <RadioOption id="es" label="Español" flag="🇪🇸" />
          </div>
          <p className="text-center text-[13px] text-[#9AA0A6] mt-4">La langue peut être changée à tout moment.</p>
       </div>
    </Screen>
  );
};

const AboutScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <Screen className="bg-white">
      <TopBar title="À propos" showBack onBack={onBack} />
      <div className="px-6 pt-10 pb-6 flex flex-col items-center h-full text-center">
         
         <BrandLogo size="large" className="mb-6" />
         
         <H2 className="mb-4">MindCare</H2>
         
         <TextBody className="text-[#5F6368] max-w-xs mb-12">
           MindCare est une application conçue pour aider les 18–25 ans à mieux comprendre et traverser leurs émotions.
         </TextBody>

         <div className="w-full space-y-3">
            <div className="flex justify-between py-3 border-b border-[#F0F0F0]">
              <span className="text-[#5F6368]">Version</span>
              <span className="text-[#1F1F1F] font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[#F0F0F0]">
              <span className="text-[#5F6368]">Conditions d'utilisation</span>
              <ChevronRight size={16} className="text-[#9AA0A6]" />
            </div>
            <div className="flex justify-between py-3 border-b border-[#F0F0F0]">
              <span className="text-[#5F6368]">Mentions légales</span>
              <ChevronRight size={16} className="text-[#9AA0A6]" />
            </div>
         </div>

         <div className="mt-auto w-full">
            <Button fullWidth variant="secondary">Nous contacter</Button>
            <p className="text-[11px] text-[#9AA0A6] mt-4">Made with ❤️ for mental health.</p>
         </div>
      </div>
    </Screen>
  );
};

// --- MAIN APP ---

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('home');
  const [history, setHistory] = useState<string[]>(['home']);
  const [resultType, setResultType] = useState<'good' | 'support'>('good');
  const [resultConcerns, setResultConcerns] = useState<string[]>([]);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const navigate = (screen: string) => {
    setHistory([...history, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@400;500;600&display=swap');`}
      </style>
      <div className="h-[100dvh] w-full bg-[#F8F9F7] font-sans text-[#1F1F1F] mx-auto max-w-md shadow-2xl overflow-hidden relative selection:bg-[#F2B9A0]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {currentScreen === 'home' && <HomeScreen onNavigate={navigate} />}
            
            {currentScreen === 'checkin' && (
              <CheckinScreen 
                onComplete={(type, concerns) => {
                  setResultType(type);
                  setResultConcerns(concerns);
                  navigate('result');
                }}
                onBack={goBack} 
              />
            )}
            
            {currentScreen === 'result' && (
              <ResultScreen type={resultType} concerns={resultConcerns} onNavigate={navigate} />
            )}

            {currentScreen === 'learn' && (
              <LearnScreen 
                onNavigate={navigate} 
                onOpenContent={(content) => {
                  setSelectedContent(content);
                  navigate('content-reader');
                }} 
              />
            )}

            {currentScreen === 'content-reader' && (
              <ContentReaderScreen content={selectedContent} onBack={goBack} />
            )}
            
            {currentScreen === 'help' && (
              <HelpScreen 
                onNavigate={navigate} 
                resultType={resultType}
                onOpenResource={(resource) => {
                  setSelectedResource(resource);
                  navigate('help-detail');
                }}
              />
            )}

            {currentScreen === 'help-detail' && (
              <HelpDetailScreen resource={selectedResource} onBack={goBack} />
            )}
            
            {currentScreen === 'settings' && <SettingsScreen onNavigate={navigate} />}
            
            {currentScreen === 'profile-edit' && <ProfileEditScreen onBack={goBack} />}
            {currentScreen === 'settings-notifications' && <NotificationsScreen onBack={goBack} />}
            {currentScreen === 'settings-privacy' && <PrivacyScreen onBack={goBack} />}
            {currentScreen === 'settings-subscription' && <SubscriptionScreen onBack={goBack} />}
            {currentScreen === 'settings-appearance' && <AppearanceScreen onBack={goBack} />}
            {currentScreen === 'settings-language' && <LanguageScreen onBack={goBack} />}
            {currentScreen === 'settings-about' && <AboutScreen onBack={goBack} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
