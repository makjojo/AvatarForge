import React, { useState } from 'react';

// Types
interface Avatar {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  style: 'realistic' | 'cartoon' | 'anime';
  image: string;
  category: string;
}

interface Template {
  id: string;
  name: string;
  category: string;
  script: string;
  hashtags: string[];
  emoji: string;
}

interface VideoFormat {
  id: string;
  name: string;
  aspectRatio: string;
  platform: string;
  emoji: string;
}

interface GenerationProgress {
  stage: string;
  progress: number;
  status: 'idle' | 'generating' | 'complete' | 'error';
}

// Données des Avatars
const AVATARS: Avatar[] = [
  { id: '1', name: 'Jean-Pierre', gender: 'male', style: 'realistic', image: '👨‍💼', category: 'Business' },
  { id: '2', name: 'Marie-Claire', gender: 'female', style: 'realistic', image: '👩‍💼', category: 'Business' },
  { id: '3', name: 'Koffi', gender: 'male', style: 'realistic', image: '🧔', category: 'Afro' },
  { id: '4', name: 'Aminata', gender: 'female', style: 'realistic', image: '👩‍🦰', category: 'Afro' },
  { id: '5', name: 'Lucas', gender: 'male', style: 'cartoon', image: '🧑‍🎨', category: 'Cartoon' },
  { id: '6', name: 'Sophie', gender: 'female', style: 'cartoon', image: '👩‍🎨', category: 'Cartoon' },
  { id: '7', name: 'Yuki', gender: 'neutral', style: 'anime', image: '🥷', category: 'Anime' },
  { id: '8', name: 'Kenji', gender: 'male', style: 'anime', image: '🦸', category: 'Anime' },
  { id: '9', name: 'Fatima', gender: 'female', style: 'realistic', image: '👩‍🦱', category: 'Muslim' },
  { id: '10', name: 'Pierre', gender: 'male', style: 'realistic', image: '👨‍🔬', category: 'Scientist' },
  { id: '11', name: 'Léa', gender: 'female', style: 'realistic', image: '👩‍⚕️', category: 'Medical' },
  { id: '12', name: 'Dakar', gender: 'male', style: 'realistic', image: '🧑‍💻', category: 'Tech' },
];

// Templates Viraux
const TEMPLATES: Template[] = [
  {
    id: '1',
    name: '🚀 Motivation',
    category: 'Motivation',
    script: 'Arrête de reporter à demain ce que tu peux faire aujourd\'hui. Le succès n\'est pas un accident, c\'est une décision. Chaque jour est une nouvelle opportunité de changer ta vie.',
    hashtags: ['#motivation', '#fyp', '#success', '#inspirational', '#goals'],
    emoji: '🚀'
  },
  {
    id: '2',
    name: '💡 Astuce Tech',
    category: 'Technologie',
    script: 'Le saviez-vous ? Vous pouvez créer des vidéos IA impressionnantes sans dépenser un seul centime. Je vais vous montrer comment dans les 30 prochaines secondes.',
    hashtags: ['#tech', '#ai', '#tutorial', '#fyp', '#innovation'],
    emoji: '💡'
  },
  {
    id: '3',
    name: '😂 Humour',
    category: 'Comédie',
    script: 'Quand tu penses avoir tout compris à la vie... et que tu découvres que ton mot de passe c\'est encore ton anniversaire. Qui suis-je ? 😂',
    hashtags: ['#funny', '#comedy', '#lol', '#fyp', '#viral'],
    emoji: '😂'
  },
  {
    id: '4',
    name: '📚 Conseil du Jour',
    category: 'Éducation',
    script: 'Voici les 3 règles d\'or pour réussir sur TikTok : Sois authentique, poste régulièrement, et offre de la valeur. C\'est aussi simple que ça.',
    hashtags: ['#tips', '#advice', '#fyp', '#learnontiktok', '#education'],
    emoji: '📚'
  },
  {
    id: '5',
    name: '🔥 Défi',
    category: 'Défi',
    script: 'Je parie que tu ne peux pas regarder cette vidéo sans sourire. Si j\'ai tort, laisse un ❤️. Si j\'ai raison, partage avec un ami !',
    hashtags: ['#challenge', '#fyp', '#viral', '#trending', '#challenge'],
    emoji: '🔥'
  },
  {
    id: '6',
    name: '💰 Business',
    category: 'Finance',
    script: 'L\'argent n\'est pas tout, mais sans argent, tout est difficile. Voici 3 façons légales de générer des revenus passifs même en dormant.',
    hashtags: ['#money', '#business', '#entrepreneur', '#fyp', '#wealth'],
    emoji: '💰'
  },
  {
    id: '7',
    name: '🌍 Vie Quotidienne',
    category: 'Lifestyle',
    script: 'La vie c\'est pas parfait, mais c\'est toi qui le rend spécial. Chaque matin est une page blanche. Écris ta meilleure histoire.',
    hashtags: ['#life', '#lifestyle', '#fyp', '#mindset', '#positive'],
    emoji: '🌍'
  },
  {
    id: '8',
    name: '🎯 Prodège',
    category: 'Développement',
    script: 'Ne compare pas ton chapitre 1 au chapitre 20 de quelqu\'un d\'autre. Ta vitesse n\'a pas d\'importance. C\'est ta direction qui compte.',
    hashtags: ['#growth', '#mindset', '#fyp', '#selfimprovement', '#goals'],
    emoji: '🎯'
  },
];

// Formats Vidéo
const FORMATS: VideoFormat[] = [
  { id: '1', name: 'TikTok', aspectRatio: '9:16', platform: 'TikTok', emoji: '📱' },
  { id: '2', name: 'Carré', aspectRatio: '1:1', platform: 'Instagram', emoji: '📷' },
  { id: '3', name: 'YouTube', aspectRatio: '16:9', platform: 'YouTube', emoji: '🎬' },
  { id: '4', name: 'Histoire', aspectRatio: '9:16', platform: 'Stories', emoji: '📖' },
];

// Backgrounds
const BACKGROUNDS = [
  { id: '1', name: 'Cyberpunk', emoji: '🌃', gradient: 'from-purple-900 via-blue-900 to-black', category: 'Futuriste' },
  { id: '2', name: 'Sunset', emoji: '🌅', gradient: 'from-orange-500 via-pink-500 to-purple-600', category: 'Nature' },
  { id: '3', name: 'Ocean', emoji: '🌊', gradient: 'from-blue-400 via-cyan-500 to-teal-600', category: 'Nature' },
  { id: '4', name: 'Aurora', emoji: '✨', gradient: 'from-green-400 via-cyan-400 to-blue-500', category: 'Futuriste' },
  { id: '5', name: 'Neon', emoji: '💜', gradient: 'from-pink-500 via-purple-500 to-indigo-600', category: 'Futuriste' },
  { id: '6', name: 'Gold', emoji: '👑', gradient: 'from-yellow-400 via-amber-500 to-orange-500', category: 'Luxe' },
  { id: '7', name: 'Forest', emoji: '🌲', gradient: 'from-green-600 via-emerald-500 to-teal-500', category: 'Nature' },
  { id: '8', name: 'Galaxy', emoji: '🌌', gradient: 'from-indigo-900 via-purple-900 to-black', category: 'Espace' },
];

// Composant Card
const GlassCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`
      bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20
      transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl
      ${onClick ? 'cursor-pointer' : ''} ${className}
    `}
  >
    {children}
  </div>
);

// Composant Bouton
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '' }) => {
  const variants = {
    primary: 'from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500',
    secondary: 'from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600',
    success: 'from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500',
    danger: 'from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-gradient-to-r ${variants[variant]} text-white font-bold rounded-xl
        shadow-lg hover:shadow-xl transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]} ${className}
      `}
    >
      {children}
    </button>
  );
};

// Composant Barre de Progression
const ProgressBar: React.FC<{ progress: GenerationProgress }> = ({ progress }) => (
  <div className="w-full">
    <div className="flex justify-between mb-2">
      <span className="text-sm text-gray-300">{progress.stage}</span>
      <span className="text-sm text-white font-bold">{Math.round(progress.progress)}%</span>
    </div>
    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500 rounded-full"
        style={{ width: `${progress.progress}%` }}
      />
    </div>
  </div>
);

// Données API Gratuites
const FREE_AI_TOOLS = [
  {
    name: 'Replicate (SadTalker)',
    description: 'Créer des vidéos parlantes depuis une photo',
    url: 'https://replicate.com',
    credits: '100 minutes gratuites',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'D-ID Free Trial',
    description: '5 vidéos + 10 minutes gratuites',
    url: 'https://did.tech',
    credits: '100% gratuit',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Google Colab',
    description: 'GPU gratuit pour IA (SadTalker, Wav2Lip)',
    url: 'https://colab.research.google.com',
    credits: 'Gratuit illimité',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'HuggingFace Spaces',
    description: 'Démonstrations gratuites IA',
    url: 'https://huggingface.co/spaces',
    credits: 'Gratuit',
    color: 'from-yellow-500 to-orange-500',
  },
];

// Instructions Colab
const COLAB_INSTRUCTIONS = [
  { step: '1', title: 'Ouvre Google Colab', desc: 'Va sur colab.research.google.com', icon: '🌐' },
  { step: '2', title: 'Crée un nouveau notebook', desc: 'Clique sur "Nouveau notebook"', icon: '📝' },
  { step: '3', title: 'Installe SadTalker', desc: 'Exécute: !git clone https://github.com/OpenTalker/SadTalker', icon: '⬇️' },
  { step: '4', title: 'Upload ta photo', desc: 'Ajoute une photo de visage', icon: '📷' },
  { step: '5', title: 'Génère la vidéo', desc: 'Exécute le code et télécharge', icon: '🎬' },
];

function App() {
  // States
  const [currentView, setCurrentView] = useState<'create' | 'tools' | 'tutorial' | 'export'>('create');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat>(FORMATS[0]);
  const [selectedBackground, setSelectedBackground] = useState(BACKGROUNDS[0]);
  const [customScript, setCustomScript] = useState('');
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [voicePitch, setVoicePitch] = useState(1);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<GenerationProgress>({
    stage: 'Prêt',
    progress: 0,
    status: 'idle'
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAPIModal, setShowAPIModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Text-to-Speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = voiceSpeed;
      utterance.pitch = voicePitch;
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simulation de génération
  const generateVideo = async () => {
    if (!selectedAvatar && !uploadedImage) {
      alert('Sélectionne un avatar ou upload une photo !');
      return;
    }

    const script = customScript || selectedTemplate?.script || '';
    if (!script) {
      alert('Écris un texte ou choisis un template !');
      return;
    }

    setProgress({ stage: 'Préparation...', progress: 10, status: 'generating' });
    
    await new Promise(r => setTimeout(r, 1000));
    setProgress({ stage: 'Synthèse vocale...', progress: 30, status: 'generating' });
    
    // Simule la synthèse
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(script.substring(0, 50) + '...');
      utterance.lang = 'fr-FR';
      utterance.rate = voiceSpeed;
      window.speechSynthesis.speak(utterance);
    }
    
    await new Promise(r => setTimeout(r, 1500));
    setProgress({ stage: 'Analyse faciale...', progress: 50, status: 'generating' });
    
    await new Promise(r => setTimeout(r, 1500));
    setProgress({ stage: 'Animation IA...', progress: 75, status: 'generating' });
    
    await new Promise(r => setTimeout(r, 1500));
    setProgress({ stage: 'Rendu final...', progress: 95, status: 'generating' });
    
    await new Promise(r => setTimeout(r, 1000));
    setProgress({ stage: 'Terminé ! 🎉', progress: 100, status: 'complete' });
    
    // Utilise l'image uploadée ou l'avatar
    const videoSource = uploadedImage || selectedAvatar?.image || '👤';
    setGeneratedVideoUrl(`data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <rect width="400" height="400" fill="${selectedBackground.gradient.includes('from-purple') ? '#1e1b4b' : selectedBackground.gradient.includes('from-orange') ? '#f97316' : '#0ea5e9'}"/>
        <text x="200" y="200" font-size="120" text-anchor="middle" dominant-baseline="middle">${videoSource}</text>
        <text x="200" y="320" font-size="20" fill="white" text-anchor="middle">Vidéo générée par AvatarForge</text>
      </svg>
    `)}`);
    
  };

  // Reset
  const resetAll = () => {
    setSelectedAvatar(null);
    setSelectedTemplate(null);
    setCustomScript('');
    setGeneratedVideoUrl(null);
    setProgress({ stage: 'Prêt', progress: 0, status: 'idle' });
    setUploadedImage(null);
  };

  // Copier le lien
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setSelectedAvatar(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🎭</span>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  AvatarForge PRO
                </h1>
                <p className="text-xs text-gray-400">Version IA Avancée</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setCurrentView('create')}>
                🎬 Créer
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowAPIModal(true)}>
                🔗 APIs
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'create', label: '🎬 Créer', icon: '✨' },
            { id: 'tools', label: '🛠️ Outils IA', icon: '🤖' },
            { id: 'tutorial', label: '📚 Tutoriel', icon: '📖' },
            { id: 'export', label: '📤 Exporter', icon: '💾' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id as any)}
              className={`
                px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all
                ${currentView === tab.id 
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* VUE: Création */}
        {currentView === 'create' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Panneau Gauche */}
            <div className="space-y-6">
              {/* Upload Photo */}
              <GlassCard className="p-5">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  📷 Ta Photo ou Avatar
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Upload */}
                  <label className="cursor-pointer">
                    <div className="aspect-square rounded-xl border-2 border-dashed border-violet-500/50 hover:border-violet-400 transition-all flex flex-col items-center justify-center bg-violet-500/10 hover:bg-violet-500/20">
                      <span className="text-4xl mb-2">📤</span>
                      <span className="text-sm text-violet-300">Upload Photo</span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  
                  {/* Preview uploaded */}
                  {uploadedImage && (
                    <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative">
                      <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover rounded-xl" />
                      <button 
                        onClick={() => setUploadedImage(null)}
                        className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Avatars Grid */}
                <p className="text-sm text-gray-400 mt-4 mb-2">Ou choisis un avatar :</p>
                <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setUploadedImage(null);
                      }}
                      className={`
                        aspect-square rounded-xl text-3xl flex items-center justify-center transition-all
                        ${selectedAvatar?.id === avatar.id 
                          ? 'ring-2 ring-violet-500 bg-violet-500/30 scale-110' 
                          : 'bg-white/5 hover:bg-white/20'}
                      `}
                      title={avatar.name}
                    >
                      {avatar.image}
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Templates */}
              <GlassCard className="p-5">
                <h3 className="text-lg font-bold mb-4">📝 Template Viral</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template);
                        setCustomScript(template.script);
                      }}
                      className={`
                        w-full p-3 rounded-xl text-left transition-all flex items-center gap-3
                        ${selectedTemplate?.id === template.id 
                          ? 'bg-gradient-to-r from-violet-600/50 to-purple-600/50 border border-violet-500' 
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'}
                      `}
                    >
                      <span className="text-2xl">{template.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{template.name}</p>
                        <p className="text-xs text-gray-400 truncate">{template.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Texte Custom */}
              <GlassCard className="p-5">
                <h3 className="text-lg font-bold mb-4">✍️ Ton Script</h3>
                <textarea
                  value={customScript}
                  onChange={(e) => {
                    setCustomScript(e.target.value);
                    setSelectedTemplate(null);
                  }}
                  placeholder="Écris ton texte ici... (ex: Arrête de reporter à demain ce que tu peux faire aujourd'hui.)"
                  className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <div className="flex gap-2 mt-3">
                  <Button onClick={() => speakText(customScript)} variant="secondary" size="sm">
                    🔊 Écouter
                  </Button>
                  <Button onClick={() => {
                    setCustomScript('');
                    setSelectedTemplate(null);
                  }} variant="secondary" size="sm">
                    🗑️ Effacer
                  </Button>
                </div>
              </GlassCard>

              {/* Format & Background */}
              <GlassCard className="p-5">
                <h3 className="text-lg font-bold mb-4">🎨 Format & Background</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Format :</p>
                    <div className="flex gap-2">
                      {FORMATS.map((format) => (
                        <button
                          key={format.id}
                          onClick={() => setSelectedFormat(format)}
                          className={`
                            px-3 py-2 rounded-xl text-sm flex items-center gap-1 transition-all
                            ${selectedFormat.id === format.id 
                              ? 'bg-violet-600 text-white' 
                              : 'bg-white/10 text-gray-300'}
                          `}
                        >
                          <span>{format.emoji}</span>
                          <span>{format.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Background :</p>
                    <div className="flex gap-2 flex-wrap">
                      {BACKGROUNDS.map((bg) => (
                        <button
                          key={bg.id}
                          onClick={() => setSelectedBackground(bg)}
                          className={`
                            w-12 h-12 rounded-xl bg-gradient-to-br ${bg.gradient} 
                            flex items-center justify-center text-xl transition-all
                            ${selectedBackground.id === bg.id ? 'ring-2 ring-white scale-110' : ''}
                          `}
                          title={bg.name}
                        >
                          {bg.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Panneau Droit - Preview */}
            <div className="space-y-6">
              {/* Preview */}
              <GlassCard className="p-5">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                  <span>👁️ Aperçu</span>
                  <Button onClick={() => speakText(customScript)} variant="secondary" size="sm">
                    🔊 Test Audio
                  </Button>
                </h3>
                
                {/* Video Preview */}
                <div 
                  className={`aspect-[${selectedFormat.aspectRatio}] bg-gradient-to-br ${selectedBackground.gradient} rounded-xl flex items-center justify-center overflow-hidden relative`}
                  style={{ aspectRatio: selectedFormat.aspectRatio.replace(':', '/') }}
                >
                  {selectedAvatar || uploadedImage ? (
                    <>
                      <div className="text-center">
                        <div className="text-8xl mb-4 animate-pulse">
                          {uploadedImage ? (
                            <img src={uploadedImage} alt="Preview" className="w-32 h-32 rounded-full object-cover mx-auto" />
                          ) : (
                            selectedAvatar?.image
                          )}
                        </div>
                        <div className="bg-black/50 backdrop-blur rounded-xl p-4 max-w-xs mx-auto">
                          <p className="text-white text-sm">
                            {customScript ? customScript.substring(0, 100) + '...' : 'Ton texte apparaîtra ici'}
                          </p>
                        </div>
                      </div>
                      {/* Animated rings */}
                      <div className="absolute inset-0 border-2 border-white/20 animate-pulse rounded-xl" />
                    </>
                  ) : (
                    <div className="text-center text-white/50">
                      <span className="text-6xl mb-4 block">🎭</span>
                      <p>Sélectionne un avatar ou upload une photo</p>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-violet-400">{selectedFormat.emoji}</p>
                    <p className="text-xs text-gray-400">{selectedFormat.name}</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-purple-400">{customScript.length}</p>
                    <p className="text-xs text-gray-400">Caractères</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-pink-400">{selectedBackground.emoji}</p>
                    <p className="text-xs text-gray-400">{selectedBackground.name}</p>
                  </div>
                </div>
              </GlassCard>

              {/* Voice Settings */}
              <GlassCard className="p-5">
                <h3 className="text-lg font-bold mb-4">🎤 Paramètres Vocaux</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 flex justify-between">
                      <span>Vitesse</span>
                      <span>{voiceSpeed.toFixed(1)}x</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voiceSpeed}
                      onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                      className="w-full accent-violet-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 flex justify-between">
                      <span>Tonalité</span>
                      <span>{voicePitch.toFixed(1)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voicePitch}
                      onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>
              </GlassCard>

              {/* Progress & Generate */}
              {progress.status !== 'idle' && (
                <GlassCard className="p-5">
                  <ProgressBar progress={progress} />
                  {progress.status === 'complete' && (
                    <p className="text-center text-emerald-400 mt-3 font-medium">
                      ✨ Vidéo générée avec succès !
                    </p>
                  )}
                </GlassCard>
              )}

              {/* Generate Button */}
              <Button 
                onClick={generateVideo} 
                variant="success" 
                size="lg" 
                className="w-full text-xl py-6"
                disabled={progress.status === 'generating'}
              >
                {progress.status === 'generating' ? '⏳ Génération en cours...' : '🎬 Générer la Vidéo'}
              </Button>

              {/* Reset */}
              <Button onClick={resetAll} variant="secondary" size="md" className="w-full">
                🔄 Nouvelle Génération
              </Button>
            </div>
          </div>
        )}

        {/* VUE: Outils IA */}
        {currentView === 'tools' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">🛠️ Outils IA Gratuits</h2>
              <p className="text-gray-400">Utilise ces outils pour générer de vraies vidéos IA</p>
            </div>

            {/* Outils principaux */}
            <div className="grid md:grid-cols-2 gap-6">
              {FREE_AI_TOOLS.map((tool, index) => (
                <GlassCard key={index} className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-3xl mb-4`}>
                    {index === 0 ? '🤖' : index === 1 ? '🎭' : index === 2 ? '📊' : '🤗'}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-gray-400 mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                      {tool.credits}
                    </span>
                    <a 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 flex items-center gap-1"
                    >
                      Ouvrir <span>↗️</span>
                    </a>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* SadTalker Instructions */}
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl">🎬</span>
                SadTalker - Guide Complet
              </h3>
              <div className="grid md:grid-cols-5 gap-4">
                {COLAB_INSTRUCTIONS.map((inst, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xl font-bold mx-auto mb-2">
                      {inst.icon}
                    </div>
                    <h4 className="font-bold mb-1">{inst.step}. {inst.title}</h4>
                    <p className="text-sm text-gray-400">{inst.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
                <p className="text-sm text-gray-300 mb-2">Code à copier dans Colab :</p>
                <code className="text-violet-400 text-xs block bg-black/30 p-2 rounded">
                  !git clone https://github.com/OpenTalker/SadTalker<br/>
                  cd SadTalker<br/>
                  !pip install -r requirements.txt
                </code>
              </div>
            </GlassCard>

            {/* Alternative: D-ID Guide */}
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">🎭</span>
                D-ID - Alternative Facile
              </h3>
              <p className="text-gray-400 mb-4">
                D-ID offre 5 vidéos gratuites et 10 minutes de vidéo. Parfait pour démarrer !
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Va sur <a href="https://did.tech" target="_blank" className="text-violet-400">did.tech</a></li>
                <li>Créé un compte gratuit</li>
                <li>Upload ta photo de visage</li>
                <li>Colle ton script ou enregistre ta voix</li>
                <li>Génère et télécharge ta vidéo !</li>
              </ol>
              <Button onClick={() => window.open('https://did.tech', '_blank')} variant="primary" className="mt-4">
                🚀 Commencer sur D-ID
              </Button>
            </GlassCard>
          </div>
        )}

        {/* VUE: Tutoriel */}
        {currentView === 'tutorial' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">📚 Guide Complet</h2>
              <p className="text-gray-400">Apprends à créer des vidéos virales étape par étape</p>
            </div>

            {/* Étapes */}
            <div className="space-y-4">
              {[
                { step: '01', title: 'Choisis ton Avatar', desc: 'Utilise ta propre photo ou sélectionne un avatar dans la liste. Pour de meilleurs résultats, utilise une photo avec bon éclairage et visage visible.', icon: '📷', color: 'from-violet-500 to-purple-600' },
                { step: '02', title: 'Écris ton Script', desc: 'Utilise un template viral ou écris ton propre texte. Les vidéos courtes (15-60 secondes) performent mieux sur TikTok.', icon: '✍️', color: 'from-blue-500 to-cyan-600' },
                { step: '03', title: 'Configure le Format', desc: 'Choisis le format TikTok (9:16) et un background accrocheur. Les couleurs vives attirent plus l\'attention.', icon: '🎨', color: 'from-pink-500 to-rose-600' },
                { step: '04', title: 'Génère la Vidéo', desc: 'Clique sur "Générer" et attend. Pour des résultats professionnels, utilise les outils IA externes recommandés.', icon: '🎬', color: 'from-emerald-500 to-green-600' },
                { step: '05', title: 'Poste sur TikTok', desc: 'Exporte ta vidéo et poste-la sur TikTok. Utilise les hashtags recommandés et poste aux meilleures heures.', icon: '📱', color: 'from-orange-500 to-amber-600' },
              ].map((item, index) => (
                <GlassCard key={index} className="p-6 flex gap-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-4xl flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-sm text-violet-400 font-medium">Étape {item.step}</span>
                    <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Conseils TikTok */}
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold mb-6">🔥 Conseils pour TikTok Viral</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-violet-500/10 rounded-xl">
                  <h4 className="font-bold text-violet-400 mb-2">⏰ Meilleures Heures</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>Lundi-Vendredi: 7h-9h, 12h-14h, 18h-21h</li>
                    <li>Samedi-Dimanche: 9h-12h, 16h-19h</li>
                  </ul>
                </div>
                <div className="p-4 bg-pink-500/10 rounded-xl">
                  <h4 className="font-bold text-pink-400 mb-2">🏷️ Hashtags Gagnants</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>#fyp #pourtoi #viral #trend</li>
                    <li>#asthétique #lifestyle #motivation</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-xl">
                  <h4 className="font-bold text-blue-400 mb-2">🎵 Tendances</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>Utilise les sons trending</li>
                    <li>Participe aux défis du moment</li>
                  </ul>
                </div>
                <div className="p-4 bg-emerald-500/10 rounded-xl">
                  <h4 className="font-bold text-emerald-400 mb-2">📊 Engagement</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>Pose des questions dans tes vidéos</li>
                    <li>Réponds aux commentaires rapidement</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* VUE: Export */}
        {currentView === 'export' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">📤 Exporter & Partager</h2>
              <p className="text-gray-400">Télécharge ta création ou partage-la directement</p>
            </div>

            {/* Video Result */}
            {generatedVideoUrl ? (
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold mb-4">🎬 Ta Vidéo Générée</h3>
                <div className={`aspect-[${selectedFormat.aspectRatio}] bg-gradient-to-br ${selectedBackground.gradient} rounded-xl flex items-center justify-center mb-4`}
                     style={{ aspectRatio: selectedFormat.aspectRatio.replace(':', '/') }}>
                  <img src={generatedVideoUrl} alt="Generated" className="max-w-full max-h-full rounded-xl" />
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Button onClick={() => {
                    const link = document.createElement('a');
                    link.href = generatedVideoUrl;
                    link.download = `avatarforge-${Date.now()}.png`;
                    link.click();
                  }} variant="primary">
                    📥 Télécharger Image
                  </Button>
                  <Button variant="secondary" onClick={() => window.open('https://www.canva.com/create/videos/', '_blank')}>
                    🎨 Modifier sur Canva
                  </Button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 text-center">
                <span className="text-6xl mb-4 block">📹</span>
                <p className="text-gray-400">Génère d'abord une vidéo pour pouvoir l'exporter</p>
                <Button onClick={() => setCurrentView('create')} variant="primary" className="mt-4">
                  🎬 Créer une Vidéo
                </Button>
              </GlassCard>
            )}

            {/* Partage */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-4">🔗 Lien de l'Application</h3>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={window.location.href} 
                  readOnly 
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                />
                <Button onClick={copyLink} variant="primary">
                  {copiedLink ? '✅ Copié !' : '📋 Copier'}
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Partage ce lien avec tes amis ou sur les réseaux sociaux !
              </p>
            </GlassCard>

            {/* Réseaux Sociaux */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'TikTok', emoji: '🎵', color: 'from-pink-500 to-rose-500', url: 'https://www.tiktok.com/upload' },
                { name: 'Instagram', emoji: '📷', color: 'from-purple-500 to-pink-500', url: 'https://www.instagram.com/' },
                { name: 'YouTube', emoji: '🎬', color: 'from-red-500 to-orange-500', url: 'https://www.youtube.com/upload' },
                { name: 'WhatsApp', emoji: '💬', color: 'from-green-500 to-emerald-500', url: 'https://wa.me/' },
              ].map((platform, index) => (
                <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer">
                  <GlassCard className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-2xl mx-auto mb-2`}>
                      {platform.emoji}
                    </div>
                    <p className="font-medium">{platform.name}</p>
                  </GlassCard>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal API Keys */}
      {showAPIModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">🔗 APIs IA Gratuites</h3>
              <button onClick={() => setShowAPIModal(false)} className="text-2xl hover:scale-110 transition">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-violet-500/20 rounded-xl border border-violet-500/30">
                <h4 className="font-bold text-violet-400 mb-2">🤖 Replicate - RECOMMANDÉ</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Accès à SadTalker, Wav2Lip, et plus. 100 minutes gratuites !
                </p>
                <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                  <li>Va sur <a href="https://replicate.com" className="text-violet-400">replicate.com</a></li>
                  <li>Créé un compte avec GitHub</li>
                  <li>Tu obtiens 100 minutes gratuites</li>
                  <li>Utilise l'API avec ton token</li>
                </ol>
              </div>

              <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <h4 className="font-bold text-blue-400 mb-2">🎭 D-ID Free Trial</h4>
                <p className="text-sm text-gray-300 mb-3">
                  5 vidéos et 10 minutes gratuites. Interface simple.
                </p>
                <a href="https://did.tech" target="_blank" className="text-blue-400 text-sm hover:underline">
                  → Aller sur D-ID →
                </a>
              </div>

              <div className="p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                <h4 className="font-bold text-green-400 mb-2">📊 Google Colab - 100% Gratuit</h4>
                <p className="text-sm text-gray-300 mb-3">
                  GPU gratuit de Google pour SadTalker et Wav2Lip.
                </p>
                <a href="https://colab.research.google.com/github/OpenTalker/SadTalker/blob/main/inference.py" 
                   target="_blank" 
                   className="text-green-400 text-sm hover:underline">
                  → Ouvrir SadTalker sur Colab →
                </a>
              </div>

              <div className="p-4 bg-orange-500/20 rounded-xl border border-orange-500/30">
                <h4 className="font-bold text-orange-400 mb-2">🔥 HeyGen Trial</h4>
                <p className="text-sm text-gray-300 mb-3">
                  3 vidéos gratuites avec templates. Qualité professionnelle.
                </p>
                <a href="https://app.heygen.com" target="_blank" className="text-orange-400 text-sm hover:underline">
                  → Essayer HeyGen →
                </a>
              </div>
            </div>

            <Button onClick={() => setShowAPIModal(false)} variant="primary" className="w-full mt-6">
              ✅ J'ai Compris
            </Button>
          </GlassCard>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            🎭 AvatarForge PRO - Créé avec ❤️ pour Jordey Tendart MAKOSSO
          </p>
          <p className="text-sm text-gray-500">
            Pointe-Noire, République du Congo 🇨🇬 | {new Date().getFullYear()}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://github.com/makjojo" target="_blank" className="text-gray-400 hover:text-white transition">
              GitHub
            </a>
            <a href="https://vercel.com" target="_blank" className="text-gray-400 hover:text-white transition">
              Vercel
            </a>
            <a href="https://did.tech" target="_blank" className="text-gray-400 hover:text-white transition">
              D-ID
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
