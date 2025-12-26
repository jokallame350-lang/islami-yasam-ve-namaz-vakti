import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Compass, Fingerprint, Book, CalendarCheck, CalendarDays, Calculator, TableProperties, Music, Mail, MapPin, Sun, Moon, Volume2, VolumeX } from 'lucide-react';

import PrayerTimes from './components/PrayerTimes';
import Imsakiye from './components/Imsakiye';
import Radio from './components/Radio';
import Messages from './components/Messages';
import NearbyMosques from './components/NearbyMosques';
import Zikirmatik from './components/Zikirmatik';
import Esma from './components/Esma';
import KazaTakibi from './components/KazaTakibi';
import DiniGunler from './components/DiniGunler';
import ZekatHesapla from './components/ZekatHesapla';

export enum ActivePage {
  HOME = 'home', IMSAKIYE = 'imsakiye', RADIO = 'radio', MESSAGES = 'messages', 
  MOSQUES = 'mosques', QIBLA = 'qibla', DHIKR = 'dhikr', ESMA = 'esma', 
  KAZA = 'kaza', DINI_GUNLER = 'dini_gunler', ZEKAT = 'zekat'
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>(ActivePage.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme_mode') !== 'light');
  const [isAdhanEnabled, setIsAdhanEnabled] = useState(() => localStorage.getItem('adhan_enabled') === 'true');

  useEffect(() => {
    localStorage.setItem('theme_mode', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const menuItems = [
    { id: ActivePage.HOME, icon: Home, label: 'Ana Sayfa' },
    { id: ActivePage.IMSAKIYE, icon: TableProperties, label: 'Aylık İmsakiye' },
    { id: ActivePage.RADIO, icon: Music, label: 'Kuran-ı Kerim' },
    { id: ActivePage.MESSAGES, icon: Mail, label: 'Hazır Mesajlar' },
    { id: ActivePage.MOSQUES, icon: MapPin, label: 'Yakın Camiler' },
    { id: ActivePage.DHIKR, icon: Fingerprint, label: 'Zikirmatik' },
    { id: ActivePage.ESMA, icon: Book, label: 'Esma-ül Hüsna' },
    { id: ActivePage.KAZA, icon: CalendarCheck, label: 'Kaza Takibi' },
    { id: ActivePage.DINI_GUNLER, icon: CalendarDays, label: 'Dini Günler 2026' },
    { id: ActivePage.ZEKAT, icon: Calculator, label: 'Zekat Hesapla' },
  ];

  const renderContent = () => {
    const props = { isDarkMode };
    switch (activePage) {
      case ActivePage.HOME: return <PrayerTimes {...props} isAdhanEnabled={isAdhanEnabled} />;
      case ActivePage.IMSAKIYE: return <Imsakiye />;
      case ActivePage.RADIO: return <Radio {...props} />;
      case ActivePage.MESSAGES: return <Messages {...props} />;
      case ActivePage.MOSQUES: return <NearbyMosques />;
      case ActivePage.DHIKR: return <Zikirmatik />;
      case ActivePage.ESMA: return <Esma />;
      case ActivePage.KAZA: return <KazaTakibi {...props} />;
      case ActivePage.DINI_GUNLER: return <DiniGunler {...props} />;
      case ActivePage.ZEKAT: return <ZekatHesapla />;
      default: return <PrayerTimes {...props} isAdhanEnabled={isAdhanEnabled} />;
    }
  };

  return (
    <div className={`flex flex-col h-full w-full relative overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-[#F2F2F7] text-black"}`}>
      <header className={`fixed top-0 left-0 right-0 h-12 backdrop-blur-md z-40 flex items-center px-4 justify-between max-w-[450px] mx-auto border-b ${isDarkMode ? "bg-black/80 border-white/5 shadow-lg" : "bg-white/80 border-gray-200 shadow-sm"}`}>
        <button onClick={() => setIsMenuOpen(true)} className="p-1"><Menu size={18} className="text-[#FFD700]" /></button>
        <div className="flex flex-col items-center">
          <h1 className={`text-[11px] font-black uppercase ${isDarkMode ? "text-white" : "text-black"}`}>EZAN VAKTİ 2026</h1>
          <span className={`text-[6.5px] font-bold uppercase tracking-[0.15em] ${isDarkMode ? 'text-[#FFD700]/70' : 'text-gray-400'}`}>NAMAZ, KURAN VE YAŞAM</span>
        </div>
        <div className="flex items-center space-x-1">
          <button onClick={() => setIsAdhanEnabled(!isAdhanEnabled)} className="p-1">{isAdhanEnabled ? <Volume2 size={16} className="text-[#FFD700]" /> : <VolumeX size={16} className="text-gray-400" />}</button>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-1">{isDarkMode ? <Sun size={16} className="text-[#FFD700]" /> : <Moon size={16} className="text-gray-600" />}</button>
        </div>
      </header>

      {isMenuOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setIsMenuOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-60 z-[60] shadow-2xl transition-transform duration-500 ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-gray-300'} ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-between items-center mb-5"><span className="text-[16px] font-black text-[#FFD700]">Menü</span><button onClick={() => setIsMenuOpen(false)}><X size={14} /></button></div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => { setActivePage(item.id); setIsMenuOpen(false); }} className={`w-full flex items-center space-x-3 p-2 rounded-lg ${activePage === item.id ? 'bg-[#FFD700]/15 text-[#FFD700]' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <item.icon size={15} /><span className="text-[10.5px] font-bold uppercase">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto pt-12 h-full">{renderContent()}</main>
    </div>
  );
};

export default App;