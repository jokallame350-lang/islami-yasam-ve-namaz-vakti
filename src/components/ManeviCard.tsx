import React, { useMemo } from 'react';
import { BookOpen, Heart, Sparkles } from 'lucide-react';

interface ContentItem {
  tur: "Ayet" | "Hadis" | "Dua" | "Hikmet";
  metin: string;
  kaynak: string;
}

const MANEVI_ICERIK: ContentItem[] = [
  { tur: "Ayet", metin: "Rabbiniz şöyle buyurdu: Bana dua edin, kabul edeyim.", kaynak: "Mümin Suresi, 60" },
  { tur: "Ayet", metin: "Şüphesiz güçlükle beraber bir kolaylık vardır.", kaynak: "İnşirah Suresi, 94:5" },
  { tur: "Hikmet", metin: "Kalpler ancak Allah'ı anmakla huzur bulur.", kaynak: "Ra'd Suresi, 13:28" },
  { tur: "Hadis", metin: "Namaz, müminin miracıdır.", kaynak: "Müsned-i Ahmed, 1:12" },
  { tur: "Hadis", metin: "Hayra vesile olan, hayrı yapan gibidir.", kaynak: "Tirmizî, İlim: 14" },
  { tur: "Dua", metin: "Rabbim! Beni ve neslimi namazı kılanlardan eyle.", kaynak: "İbrahim Suresi, 14:40" },
  { tur: "Hikmet", metin: "Gülümsemek sadakadır.", kaynak: "Tirmizî, Birr: 36" },
  { tur: "Ayet", metin: "Allah sabredenlerle beraberdir.", kaynak: "Bakara Suresi, 2:153" },
  { tur: "Ayet", metin: "O, her şeyi hakkıyla bilendir.", kaynak: "Mülk Suresi, 67:13" },
  { tur: "Hadis", metin: "Sizin en hayırlınız, Kur'an'ı öğrenen ve öğretendir.", kaynak: "Buhârî, Fezâilü'l-Kur'ân: 21" }
];

const ManeviCard: React.FC<{ title?: string; isDarkMode?: boolean }> = ({ title, isDarkMode = true }) => {
  const item = useMemo(() => {
    return MANEVI_ICERIK[Math.floor(Math.random() * MANEVI_ICERIK.length)];
  }, []);

  const Icon = item.tur === "Ayet" ? BookOpen : item.tur === "Hadis" ? Heart : Sparkles;

  const cardStyles = isDarkMode
    ? "bg-[#111111] border-white/5 shadow-xl"
    : "bg-white border-gray-200 shadow-md";

  const textStyles = isDarkMode ? "text-gray-200" : "text-gray-700";
  const sourceStyles = isDarkMode ? "text-[#FFD700]" : "text-[#B8860B]";

  return (
    <div className={`relative overflow-hidden border rounded-[1.4rem] p-5 transition-all duration-500 ${cardStyles}`}>
      {/* Arka plan parlama efekti */}
      <div className={`absolute -right-6 -top-6 w-16 h-16 rounded-full blur-2xl ${isDarkMode ? 'bg-[#FFD700]/5' : 'bg-[#FFD700]/10'}`}></div>
      
      <div className="flex items-center space-x-2 mb-3">
        <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-[#FFD700]/10' : 'bg-[#FFD700]/15'}`}>
          <Icon size={14} className="text-[#FFD700]" />
        </div>
        <span className="text-[10px] text-[#FFD700] font-black uppercase tracking-[0.2em]">
          {title || `GÜNÜN ${item.tur.toUpperCase()}İ`}
        </span>
      </div>

      <p className={`text-[13px] leading-snug font-medium italic ${textStyles} mb-4`}>
        "{item.metin}"
      </p>

      {/* Kaynak Tasarımı - Sağa Yaslı ve Tireli */}
      <div className="flex justify-end items-center">
        <div className={`text-[10px] font-black flex items-center ${sourceStyles} tracking-tight`}>
          <span className="mr-1.5 opacity-60">—</span>
          {item.kaynak}
        </div>
      </div>
    </div>
  );
};

export default ManeviCard;