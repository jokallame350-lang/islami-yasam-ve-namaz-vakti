import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Loader2, Search, SkipBack, SkipForward } from 'lucide-react';

const SURA_LIST = [
  "Fatiha", "Bakara", "Âl-i İmrân", "Nisâ", "Mâide", "En'âm", "A'râf", "Enfâl", "Tevbe", "Yûnus",
  "Hûd", "Yûsuf", "Ra'd", "İbrâhîm", "Hicr", "Nahl", "İsrâ", "Kehf", "Meryem", "Tâhâ",
  "Enbiyâ", "Hac", "Mü'minûn", "Nûr", "Furkân", "Şuarâ", "Neml", "Kasas", "Ankebût", "Rûm",
  "Lokmân", "Secde", "Ahzâb", "Sebe'", "Fâtır", "Yâsîn", "Sâffât", "Sâd", "Zümer", "Mü'min",
  "Fussilet", "Şûrâ", "Zuhruf", "Duhân", "Câsiye", "Ahkâf", "Muhammed", "Fetih", "Hucurât", "Kâf",
  "Zâriyât", "Tûr", "Necm", "Kamer", "Rahmân", "Vâkıa", "Hadîd", "Mücâdele", "Haşr", "Mümtehine",
  "Saff", "Cuma", "Münâfikûn", "Tegâbun", "Talâk", "Tahrîm", "Mülk", "Kalem", "Hâkka", "Meâric",
  "Nûh", "Cin", "Müzzemmil", "Müddessir", "Kıyâmet", "İnsân", "Mürselât", "Nebe", "Nâziât", "Abese",
  "Tekvîr", "İnfitâr", "Mutaffifîn", "İnşikâk", "Burûc", "Târık", "A'lâ", "Gâşiye", "Fecr", "Beled",
  "Şems", "Leyl", "Duhâ", "İnşirah", "Tîn", "Alak", "Kadir", "Beyyine", "Zilzâl", "Âdiyât",
  "Kâria", "Tekâsür", "Asr", "Hümeze", "Fîl", "Kureyş", "Mâûn", "Kevser", "Kâfirûn", "Nasr",
  "Tebbet", "İhlâs", "Felak", "Nâs"
];

const Radio: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudioUrl = (num: number) => {
    const formattedNum = num.toString().padStart(3, '0');
    return `https://server8.mp3quran.net/afs/${formattedNum}.mp3`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsLoading(true);
        audioRef.current.play().catch(e => console.error("Oynatma hatası:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const selectSurah = (num: number) => {
    setCurrentSurah(num);
    setIsPlaying(true);
    setIsLoading(true);
    if (audioRef.current) {
      audioRef.current.src = getAudioUrl(num);
      audioRef.current.play().catch(e => console.error("Oynatma hatası:", e));
    }
  };

  const nextSurah = () => selectSurah(Math.min(114, currentSurah + 1));
  const prevSurah = () => selectSurah(Math.max(1, currentSurah - 1));

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onwaiting = () => setIsLoading(true);
      audioRef.current.onplaying = () => setIsLoading(false);
      audioRef.current.onended = () => nextSurah();
      audioRef.current.onerror = () => {
        setIsLoading(false);
        setIsPlaying(false);
      };
    }
  }, [currentSurah]);

  const filteredSurahs = SURA_LIST.map((name, i) => ({ id: i + 1, name }))
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={`flex flex-col h-full p-4 transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-[#F2F2F7] text-black'}`}>
      <audio ref={audioRef} src={getAudioUrl(currentSurah)} />
      
      <h2 className="text-xl font-black mb-4">Kuran-ı Kerim</h2>

      {/* Player Card */}
      <div className={`p-6 rounded-3xl mb-6 border flex flex-col items-center shadow-xl transition-all ${isDarkMode ? 'bg-[#111] border-white/5' : 'bg-white border-gray-200'}`}>
        <div className={`p-5 rounded-full mb-4 relative ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
          <Music size={30} className="text-[#FFD700]" />
          {isLoading && <Loader2 size={45} className="text-[#FFD700] absolute -top-2 -left-2 animate-spin opacity-60" />}
        </div>
        
        <h3 className="text-lg font-black mb-1">{currentSurah}. {SURA_LIST[currentSurah - 1]}</h3>
        <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-6">TAM SURE OKUNUŞU</p>

        <div className="flex items-center space-x-6">
          <button onClick={prevSurah} className={`p-3 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}><SkipBack size={20} /></button>
          <button onClick={togglePlay} className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center text-black shadow-lg active:scale-90 transition-all">
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          <button onClick={nextSurah} className={`p-3 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}><SkipForward size={20} /></button>
        </div>
      </div>

      {/* List Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Sure Ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full py-3 pl-10 pr-4 rounded-xl border text-xs outline-none focus:border-[#FFD700]/50 ${isDarkMode ? 'bg-[#111] border-white/5 text-white' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1.5 pb-20">
          {filteredSurahs.map(surah => (
            <button
              key={surah.id}
              onClick={() => selectSurah(surah.id)}
              className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${surah.id === currentSurah ? 'bg-[#FFD700]/10 border-[#FFD700]/30' : isDarkMode ? 'bg-[#111] border-white/5' : 'bg-white border-gray-100'}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-[9px] font-black text-[#FFD700] w-6">#{surah.id}</span>
                <span className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{surah.name} Suresi</span>
              </div>
              <Play size={12} className={surah.id === currentSurah ? 'text-[#FFD700]' : 'text-gray-400'} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Radio;