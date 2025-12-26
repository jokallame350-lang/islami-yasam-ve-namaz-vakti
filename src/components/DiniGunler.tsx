
import React from 'react';
import { Calendar } from 'lucide-react';

interface ReligiousDay {
  name: string;
  date: string;
  isoDate: string;
}

const RELIGIOUS_DAYS: ReligiousDay[] = [
  { name: "Miraç Kandili", date: "15 Ocak 2026 Perşembe", isoDate: "2026-01-15" },
  { name: "Berat Kandili", date: "2 Şubat 2026 Pazartesi", isoDate: "2026-02-02" },
  { name: "Ramazan Başlangıcı", date: "19 Şubat 2026 Perşembe", isoDate: "2026-02-19" },
  { name: "Kadir Gecesi", date: "16 Mart 2026 Pazartesi", isoDate: "2026-03-16" },
  { name: "Ramazan Bayramı (1. Gün)", date: "20 Mart 2026 Cuma", isoDate: "2026-03-20" },
  { name: "Kurban Bayramı (1. Gün)", date: "27 Mayıs 2026 Çarşamba", isoDate: "2026-05-27" },
  { name: "Hicri Yılbaşı", date: "16 Haziran 2026 Salı", isoDate: "2026-06-16" },
  { name: "Aşure Günü", date: "25 Haziran 2026 Perşembe", isoDate: "2026-06-25" },
  { name: "Mevlid Kandili", date: "24 Ağustos 2026 Pazartesi", isoDate: "2026-08-24" },
  { name: "Regaip Kandili", date: "10 Aralık 2026 Perşembe", isoDate: "2026-12-10" },
];

const DiniGunler: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const calculateDaysLeft = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className={`flex flex-col h-full p-6 animate-in fade-in duration-700 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter mb-2">Dini Günler</h2>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">2026 Yılı Takvimi</p>
      </div>

      <div className="space-y-4 pb-12">
        {RELIGIOUS_DAYS.map((day, index) => {
          const daysLeft = calculateDaysLeft(day.isoDate);
          let statusLabel = daysLeft < 0 ? "GEÇTİ" : (daysLeft === 0 ? "BUGÜN" : `${daysLeft} GÜN KALDI`);
          let statusStyle = daysLeft < 0 ? "bg-gray-100 text-gray-400 border-gray-200" : (daysLeft === 0 ? "bg-[#FFD700] text-black border-[#FFD700]" : "bg-[#006400]/10 text-[#006400] border-[#006400]/20");

          return (
            <div 
              key={index}
              className={`flex items-center justify-between p-5 rounded-[2rem] border transition-all ${isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-gray-200'} ${daysLeft < 0 ? 'opacity-40' : 'shadow-xl'}`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} ${daysLeft >= 0 ? 'text-[#FFD700]' : 'text-gray-400'}`}>
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-[13px] font-black uppercase tracking-wider">{day.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">{day.date}</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest ${statusStyle}`}>{statusLabel}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiniGunler;
