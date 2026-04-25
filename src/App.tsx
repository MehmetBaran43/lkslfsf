/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format, parse, differenceInSeconds, isAfter, addDays } from 'date-fns';
import { 
  Clock, BookOpen, Info, Fingerprint, MessageSquare, Settings, 
  Crown, Plus, RotateCcw, Play, Send, Mic, MicOff, Loader, 
  Check, AlertCircle, Lock, X, Star
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { 
  PRAYER_NAMES, ADHAN_OPTIONS, DUALAR, SURELER, NAMAZ_REHBERI 
} from './constants';
import { askHuzurAI } from './services/geminiService';

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom Icon wrapper to match original usage pattern with lucide-react
const Icon = ({ name: IconComp, size = 24, className = "" }: { name: any, size?: number, className?: string }) => {
  return <IconComp size={size} className={className} />;
};

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState('vakitler');
  const [vakitler, setVakitler] = useState<Record<string, string> | null>(null);
  const [sehir, setSehir] = useState('Istanbul');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // AdMob Mock
  const [showAd, setShowAd] = useState(false);
  const [adTimer, setAdTimer] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  
  // Settings
  const [selectedAdhanName, setSelectedAdhanName] = useState('İstanbul');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Features
  const [zikirCount, setZikirCount] = useState(0);
  const [duaCategory, setDuaCategory] = useState<'dualar'|'sureler'>('dualar');

  // AI
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: 'Selamün Aleyküm! Ben Huzur AI. Size nasıl yardımcı olabilirim?' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // Effects
  useEffect(() => {
    fetchVakitler(sehir);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [sehir]);

  // AdMob Timer Effect
  useEffect(() => {
    if (showAd) {
      setAdTimer(10);
      const interval = setInterval(() => {
        setAdTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showAd]);

  // Actions
  const fetchVakitler = async (city: string) => {
    try {
      const res = await fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${city},Turkey&method=13`);
      const data = await res.json();
      setVakitler(data.data.timings);
    } catch (e) {
      console.error(e);
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab !== activeTab) {
      setTabSwitchCount(prev => {
        if (prev + 1 >= 5) {
          setShowAd(true);
          return 0;
        }
        return prev + 1;
      });
    }
    setActiveTab(tab);
  };

  const playAdhanTest = (name: string) => {
    setSelectedAdhanName(name);
    const audio = new Audio(ADHAN_OPTIONS[name]);
    audio.play();
    setTimeout(() => audio.pause(), 5000);
  };

  const nextPrayer = useMemo(() => {
    if (!vakitler) return { name: 'Yükleniyor...', countdown: '--:--:--' };
    
    const now = currentTime;
    const times = [
      { name: 'İmsak', timeStr: vakitler.Fajr },
      { name: 'Güneş', timeStr: vakitler.Sunrise },
      { name: 'Öğle', timeStr: vakitler.Dhuhr },
      { name: 'İkindi', timeStr: vakitler.Asr },
      { name: 'Akşam', timeStr: vakitler.Maghrib },
      { name: 'Yatsı', timeStr: vakitler.Isha }
    ];

    let nextTask = null;
    let targetDate = null;

    for (const t of times) {
      const parsedTime = parse(t.timeStr, 'HH:mm', now);
      if (isAfter(parsedTime, now)) {
        nextTask = t;
        targetDate = parsedTime;
        break;
      }
    }

    if (!nextTask) {
      nextTask = times[0];
      targetDate = addDays(parse(nextTask.timeStr, 'HH:mm', now), 1);
    }

    const diffSecs = differenceInSeconds(targetDate, now);
    const hh = Math.floor(diffSecs / 3600).toString().padStart(2, '0');
    const mm = Math.floor((diffSecs % 3600) / 60).toString().padStart(2, '0');
    const ss = (diffSecs % 60).toString().padStart(2, '0');

    return { name: nextTask.name, countdown: `${hh}:${mm}:${ss}` };
  }, [vakitler, currentTime]);

  const handleSendAI = async (text: string) => {
    if (!text.trim() || aiLoading) return;
    const userMsg = text.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiInput('');
    setAiLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.text }]
    }));

    const response = await askHuzurAI(userMsg, history);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setAiLoading(false);

    // TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(response.replace(/[*#]/g, ''));
      utterance.lang = 'tr-TR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Sub-Components
  const BannerAd = () => (
    <div className="w-full rounded-[2rem] overflow-hidden border border-slate-700/50 relative shadow-lg min-h-[60px]">
      <div className="bg-gradient-to-r from-[#0a1628] to-[#0f2040] flex items-center justify-between px-4 h-[60px] gap-3 relative">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
            <Star size={18} className="text-huzuryellow-400" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">Huzur Vakit - Reklam Alanı</p>
            <p className="text-slate-500 text-[9px] font-mono truncate">ca-app-pub-3554022053924639/3223907249</p>
          </div>
        </div>
        <div className="absolute top-1.5 left-1.5 bg-slate-700/80 text-slate-400 text-[8px] font-bold px-1.5 py-0.5 rounded">
          Ad
        </div>
      </div>
    </div>
  );

  const renderTab = () => {
    switch(activeTab) {
      case 'vakitler':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[4rem] p-10 text-center border-2 border-huzuryellow-400/20 shadow-[0_20px_50px_-12px_rgba(251,191,36,0.25)] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-huzuryellow-400/10 rounded-full blur-3xl"></div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">{nextPrayer.name} Vaktine Kalan Süre</p>
              <h2 className="text-7xl font-serif font-bold text-huzuryellow-400 mb-6 tracking-tighter drop-shadow-lg leading-tight">{nextPrayer.countdown}</h2>
              <div className="inline-flex items-center gap-2 bg-[#020617]/60 px-6 py-3 rounded-full text-xs text-slate-300 font-medium">
                <Clock size={14} className="text-huzuryellow-400" /> Şu anki saat: {format(currentTime, 'HH:mm:ss')}
              </div>
            </div>

            <BannerAd />

            <div className="grid grid-cols-2 gap-5">
              {vakitler ? Object.keys(PRAYER_NAMES).map(key => (
                <div key={key} className="glass-panel p-6 rounded-[3rem] text-center hover:border-huzuryellow-400/50 transition-all shadow-xl flex flex-col items-center justify-center h-32">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{PRAYER_NAMES[key]}</span>
                  <p className="text-3xl font-serif font-bold text-huzuryellow-400 drop-shadow-md">{vakitler[key]}</p>
                </div>
              )) : (
                <div className="col-span-2 text-center py-20 text-slate-500">Yükleniyor...</div>
              )}
            </div>
          </motion.div>
        );

      case 'dualar':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-20">
            <div className="flex bg-navy-900 rounded-full p-1 border border-slate-800">
              <button 
                onClick={() => setDuaCategory('dualar')} 
                className={cn("flex-1 py-3 rounded-full text-sm font-bold transition-colors", duaCategory === 'dualar' ? 'bg-huzuryellow-400 text-navy-950' : 'text-slate-400')}
              >
                Dualar
              </button>
              <button 
                onClick={() => setDuaCategory('sureler')} 
                className={cn("flex-1 py-3 rounded-full text-sm font-bold transition-colors", duaCategory === 'sureler' ? 'bg-huzuryellow-400 text-navy-950' : 'text-slate-400')}
              >
                Sureler
              </button>
            </div>
            <div className="space-y-4">
              {(duaCategory === 'dualar' ? DUALAR : SURELER).map((item, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-[2rem] shadow-lg">
                  <h4 className="font-bold text-lg text-white mb-3">{item.ad}</h4>
                  <p className="text-sm text-huzuryellow-400 italic mb-4 leading-relaxed whitespace-pre-wrap">{item.okunus}</p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-4 border-t border-slate-800">{item.anlam}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'namaz':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 pb-20">
            <h3 className="text-2xl font-serif text-huzuryellow-400 font-bold ml-2 mb-6">Namaz Rehberi</h3>
            {NAMAZ_REHBERI.map((n, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-[2.5rem] shadow-xl">
                <h4 className="font-bold text-xl text-white mb-1">{n.ad}</h4>
                <p className="text-xs font-bold text-huzuryellow-400 mb-6 uppercase tracking-widest">{n.rekat}</p>
                <ul className="space-y-4">
                  {n.detay.map((d, i) => (
                    <li key={i} className="flex gap-4 text-sm text-slate-300 items-start">
                      <span className="w-8 h-8 rounded-full bg-navy-800 border border-slate-700 text-huzuryellow-400 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-inner">{i+1}</span>
                      <span className="pt-1.5 leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        );

      case 'zikir':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-10">
            <div className="w-80 h-80 relative flex items-center justify-center">
              {/* Progress Dots */}
              <div className="absolute inset-0">
                {[...Array(33)].map((_, i) => {
                  const angle = (i * 360) / 33 - 90;
                  const radius = 150;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  const isActive = (zikirCount % 33) > i || (zikirCount > 0 && zikirCount % 33 === 0 && i === 32);
                  
                  return (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{ 
                        scale: isActive ? 1.2 : 1,
                        backgroundColor: isActive ? "#FFFFFF" : "#1E293B",
                        boxShadow: isActive ? "0 0 10px rgba(255,255,255,0.8)" : "none"
                      }}
                      className="absolute w-2 h-2 rounded-full"
                      style={{ 
                        left: `calc(50% + ${x}px - 4px)`,
                        top: `calc(50% + ${y}px - 4px)`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Main Counter Circle */}
              <div className="w-64 h-64 border-[8px] border-navy-900 rounded-full flex flex-col items-center justify-center relative shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] bg-navy-950 z-10">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={zikirCount}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-7xl font-serif font-bold text-huzuryellow-400 drop-shadow-lg"
                  >
                    {zikirCount}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[10px] text-slate-500 font-bold tracking-[0.2em] mt-2 uppercase">
                  {Math.floor(zikirCount / 33) + 1}. TUR
                </span>
              </div>
            </div>

            <div className="flex gap-8 mt-16">
              <button 
                onClick={() => setZikirCount(0)} 
                className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center text-slate-500 border border-slate-800 hover:text-white transition-colors"
                title="Sıfırla"
              >
                <Icon name={RotateCcw} />
              </button>
              <button 
                onClick={() => {
                  setZikirCount(c => c + 1);
                  // Haptic feedback mock (vibration could be added here for mobile)
                }} 
                className="w-28 h-28 rounded-full bg-huzuryellow-400 flex items-center justify-center text-navy-950 shadow-[0_0_40px_rgba(251,191,36,0.3)] active:scale-95 transition-all"
              >
                <Icon name={Plus} size={48} />
              </button>
            </div>
          </motion.div>
        );

      case 'ai':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-[65vh]">
            <div className="flex-1 glass-panel rounded-[3rem] p-6 overflow-y-auto mb-5 space-y-5 flex flex-col shadow-xl scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    "p-5 rounded-[2rem] max-w-[85%] text-sm shadow-lg whitespace-pre-wrap leading-relaxed",
                    m.role === 'user' ? 'bg-huzuryellow-400 text-navy-950 rounded-br-none' : 'bg-navy-800 text-slate-200 rounded-bl-none border border-slate-700'
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="flex justify-start">
                  <div className="bg-navy-800 border border-slate-700 p-5 rounded-[2rem] rounded-bl-none flex items-center gap-3 shadow-lg">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-2 h-2 bg-huzuryellow-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }} className="w-2 h-2 bg-huzuryellow-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }} className="w-2 h-2 bg-huzuryellow-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 bg-navy-900 p-2 rounded-full border border-slate-800 shadow-2xl items-center">
              <button 
                onClick={() => setIsListening(!isListening)} 
                className={cn("w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0 transition-colors", isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-navy-800 text-huzuryellow-400')}
              >
                <Icon name={isListening ? MicOff : Mic} size={20} />
              </button>
              <input
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendAI(aiInput)}
                className="flex-1 bg-transparent px-4 text-sm focus:outline-none text-white placeholder-slate-500"
                placeholder={aiLoading ? 'Yanıt bekleniyor...' : 'Bir soru sorun...'}
                disabled={aiLoading}
              />
              <button
                onClick={() => handleSendAI(aiInput)}
                disabled={aiLoading}
                className={cn("w-12 h-12 flex items-center justify-center text-navy-950 rounded-full font-bold shadow-lg flex-shrink-0 transition-transform hover:scale-105", aiLoading ? 'bg-slate-700' : 'bg-huzuryellow-400')}
              >
                {aiLoading ? <Loader size={18} className="animate-spin text-slate-400" /> : <Icon name={Send} size={18} />}
              </button>
            </div>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-20">
            <h3 className="text-2xl font-serif text-huzuryellow-400 font-bold ml-2">Ayarlar</h3>
            <div className="glass-panel p-8 rounded-[3rem] space-y-6 shadow-xl">
              <h4 className="font-bold text-white flex items-center gap-3"><Icon name={Settings} size={20} className="text-huzuryellow-400"/> Şehir Seçimi</h4>
              <select 
                value={sehir} 
                onChange={(e) => setSehir(e.target.value)}
                className="w-full bg-navy-950 border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none"
              >
                <option value="Istanbul">İstanbul</option>
                <option value="Ankara">Ankara</option>
                <option value="Izmir">İzmir</option>
                <option value="Bursa">Bursa</option>
                <option value="Antalya">Antalya</option>
              </select>

              <h4 className="font-bold text-white flex items-center gap-3 pt-4 border-t border-white/5"><Icon name={RotateCcw} size={20} className="text-huzuryellow-400"/> Ezan Sesi Seçimi</h4>
              <div className="grid grid-cols-1 gap-3">
                {Object.keys(ADHAN_OPTIONS).map(name => (
                  <div key={name} className={cn(
                    "flex justify-between items-center bg-navy-900 p-4 rounded-[2rem] border-2 transition-all",
                    selectedAdhanName === name ? 'border-huzuryellow-400 text-huzuryellow-400' : 'border-transparent text-slate-400'
                  )}>
                    <span className="text-sm font-bold pl-2">{name} Ezanı</span>
                    <div className="flex gap-2">
                      <button onClick={() => playAdhanTest(name)} className="w-10 h-10 flex items-center justify-center bg-navy-800 rounded-full text-white"><Icon name={Play} size={16} /></button>
                      <button onClick={() => setSelectedAdhanName(name)} className="px-5 py-2 bg-huzuryellow-400 text-navy-950 rounded-full text-xs font-bold">{selectedAdhanName === name ? 'Seçildi' : 'Seç'}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col p-6 relative bg-navy-950 font-sans">
      <header className="flex justify-center items-center mb-10 pt-4">
        <h1 className="text-3xl font-serif font-bold text-huzuryellow-400 italic drop-shadow-md">
          Huzur Vakit
        </h1>
      </header>

      <main className="flex-1 pb-32">
        <AnimatePresence mode="wait">
          {renderTab()}
        </AnimatePresence>
      </main>

      {/* Nav */}
      <nav className="fixed bottom-6 left-6 right-6 glass-panel rounded-[3rem] p-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/10 overflow-x-auto scrollbar-hide gap-2">
        {[
          { id: 'vakitler', icon: Clock },
          { id: 'dualar', icon: BookOpen },
          { id: 'namaz', icon: Info },
          { id: 'zikir', icon: Fingerprint },
          { id: 'ai', icon: MessageSquare },
          { id: 'settings', icon: Settings },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => handleTabChange(tab.id)} 
            className={cn(
              "p-3 rounded-full transition-all duration-400 flex-shrink-0",
              activeTab === tab.id ? "bg-huzuryellow-400 text-navy-950 shadow-[0_10px_25px_-5px_rgba(251,191,36,0.4)] scale-110 -translate-y-1" : "text-slate-400 hover:text-white"
            )}
          >
            <tab.icon size={22} />
          </button>
        ))}
      </nav>

      {/* Interstitial Mockup */}
      <AnimatePresence>
        {showAd && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[4000] flex flex-col"
          >
            <div className="flex-1 bg-navy-950 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-[#0f2040] to-navy-900 opacity-50"></div>
              <div className="relative z-10 text-center px-8 py-12 max-w-xs mx-auto">
                <div className="w-28 h-28 bg-huzuryellow-400 rounded-[2.5rem] mx-auto mb-8 flex items-center justify-center shadow-[0_0_60px_rgba(251,191,36,0.5)]">
                  <Star size={56} className="text-navy-950" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-white mb-3">Huzur Vakit</h2>
                <p className="text-slate-400 text-sm leading-relaxed">Ücretsiz kullanım için bu kısa reklamı izleyin.</p>
                <div className="mt-8 flex justify-center gap-2">
                  {[0, 150, 300].map(delay => (
                    <motion.div key={delay} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: delay/1000 }} className="w-2.5 h-2.5 bg-huzuryellow-400/60 rounded-full" />
                  ))}
                </div>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-1.5 grayscale opacity-50">
                <div className="bg-huzuryellow-400 text-black text-[9px] font-bold px-2 py-0.5 rounded">AD</div>
                <span className="text-slate-400 text-[9px] font-mono">ca-app-pub-3554022053924639/1338920440</span>
              </div>
              
              {adTimer > 0 ? (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2 border border-white/10">
                  <Loader size={14} className="animate-spin text-huzuryellow-400" /> {adTimer}sn
                </div>
              ) : (
                <button onClick={() => setShowAd(false)} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md w-11 h-11 rounded-full flex items-center justify-center text-white transition-colors border border-white/10">
                  <X size={20} />
                </button>
              )}
            </div>
            {adTimer > 0 && <div className="h-1 w-full bg-slate-800"><div className="h-full bg-huzuryellow-400 progress-bar-fill"></div></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
