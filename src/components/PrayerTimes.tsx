import React, { useState, useEffect } from 'react';
import { MapPin, ChevronRight, Loader2, Sunrise, Sun, CloudSun, Sunset, Moon } from 'lucide-react';
import ManeviCard from './ManeviCard';

const PRAYER_NAMES: Record<string, string> = { Fajr: 'İmsak', Sunrise: 'Güneş', Dhuhr: 'Öğle', Asr: 'İkindi', Maghrib: 'Akşam', Isha: 'Yatsı' };
const PRAYER_ORDER = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const PRAYER_ICONS: Record<string, any> = { Fajr: Moon, Sunrise: Sunrise, Dhuhr: Sun, Asr: CloudSun, Maghrib: Sunset, Isha: Moon };

const PrayerTimes: React.FC<{ isDarkMode: boolean; isAdhanEnabled: boolean }> = ({ isDarkMode, isAdhanEnabled }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const [totalMinutesLeft, setTotalMinutesLeft] = useState(0);
  const [nextPrayerInfo, setNextPrayerInfo] = useState({ name: '', time: '', key: '' });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=13`);
      const json = await res.json();
      setData(json.data);
      setLoading(false);
    }, () => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data) return;
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const timings = data.timings;
      let target: Date | null = null;
      let name = "", key = "";

      for (const k of PRAYER_ORDER) {
        const [h, m] = timings[k].split(':').map(Number);
        const pDate = new Date(); pDate.setHours(h, m, 0, 0);
        if (pDate > now) { target = pDate; name = PRAYER_NAMES[k]; key = k; break; }
      }
      if (!target) {
        const [h, m] = timings['Fajr'].split(':').map(Number);
        target = new Date(); target.setDate(target.getDate() + 1); target.setHours(h, m, 0, 0);
        name = "İmsak (Yarın)"; key = 'Fajr';
      }

      const diff = target.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimeLeft(`${pad(h)}:${pad(m)}:${pad(s)}`);
      setTotalMinutesLeft(Math.floor(diff / 60000));
      setNextPrayerInfo({ name, time: timings[key], key });
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-[#FFD700]" size={24} /></div>;

  return (
    <div className="flex flex-col h-full p-4 pb-16 overflow-y-auto no-scrollbar transition-colors">
      
      {/* ÜST BİLGİ */}
      <div className="flex justify-between items-end mb-4 px-1">
        <div>
          <div className="flex items-center space-x-1">
            <MapPin size={12} className="text-[#FFD700]" />
            <h2 className={`text-[15px] font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Polatlı</h2>
          </div>
          <div className="text-[8px] font-semibold uppercase tracking-wider text-gray-500">
             {currentTime.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })}
          </div>
        </div>
        <div className="flex flex-col items-end">
            <span className={`text-[18px] font-black tracking-tighter tabular-nums leading-none ${isDarkMode ? "text-white" : "text-black"}`}>
                {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-[#FFD700]">YEREL SAAT</span>
        </div>
      </div>

      {/* SAYAÇ KARTI */}
      <div className={`relative overflow-hidden rounded-2xl py-6 px-5 mb-4 border transition-all duration-300 ${isDarkMode ? "bg-gradient-to-br from-[#121212] to-[#000000] border-white/5 shadow-lg" : "bg-white border-gray-300 shadow-sm"}`}>
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#FFD700]/5 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] mb-2 text-gray-500">SIRADAKİ VAKTE KALAN</p>
          <div className={`text-4xl font-black tracking-tighter tabular-nums leading-none py-3 ${isDarkMode ? "text-white drop-shadow-[0_0_15px_rgba(255,215,0,0.2)]" : "text-black"}`}>
            {timeLeft}
          </div>
          <div className={`px-3 py-1 mt-1 rounded-full border ${isDarkMode ? "bg-[#FFD700]/10 border-[#FFD700]/20" : "bg-[#FFD700]/5 border-[#FFD700]/40"}`}>
             <span className="text-[9px] font-black text-[#FFD700] uppercase tracking-widest">{totalMinutesLeft} DAKİKA KALDI</span>
          </div>
        </div>
      </div>

      {/* VAKİT LİSTESİ */}
      <div className="space-y-1.5">
        {PRAYER_ORDER.map((k) => {
          const isNext = nextPrayerInfo.key === k;
          const IconComponent = PRAYER_ICONS[k];
          return (
            <div key={k} className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${isNext ? (isDarkMode ? 'bg-[#FFD700]/10 border-[#FFD700]/30' : 'bg-[#FFD700]/10 border-[#FFD700]/50 shadow-md') : (isDarkMode ? 'bg-[#0F0F0F] border-white/5' : 'bg-white border-gray-200 shadow-sm')}`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isNext ? 'bg-[#FFD700] text-black shadow-md' : (isDarkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-400')}`}>
                   <IconComponent size={14} strokeWidth={2.5} />
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${isNext ? 'text-[#FFD700]' : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>{PRAYER_NAMES[k]}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-[15px] font-black tabular-nums ${isNext ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-gray-300' : 'text-gray-500')}`}>{data.timings[k]}</span>
                <ChevronRight size={12} className={isNext ? 'text-[#FFD700]' : 'text-gray-300'} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <ManeviCard isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default PrayerTimes;