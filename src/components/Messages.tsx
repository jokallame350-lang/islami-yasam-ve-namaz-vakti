
import React, { useState } from 'react';
import { Copy, Check, MessageSquare } from 'lucide-react';

const MESSAGES_DATA = {
  cuma: [
    "Kalpler imanla, gönüller huzurla dolsun. Cumanız mübarek olsun.",
    "Rabbim bu mübarek gün hürmetine dualarınızı kabul eylesin. Hayırlı Cumalar.",
    "Ey Rabbim! Yalvarışım Rahmetine güvenimden, her şey Senin elinde. Hayırlı Nurlu Cumalar.",
    "Güzellikler içinizi aydınlatsın, yüzünüzden ve yüreğinizden tebessüm eksilmesin. Cumanız mübarek olsun."
  ],
  kandil: [
    "Bu gece duaların kabul, amellerin makbul olduğu gecedir. Kandiliniz kutlu olsun.",
    "Gecenin nuru, gönlünüzün huzuru olsun. Mevla dualarınızı geri çevirmesin. Hayırlı Kandiller.",
    "Kandil gecesi, karanlıktan aydınlığa çıkışın, affın ve mağfiretin müjdecisidir. Mübarek olsun."
  ],
  bayram: [
    "Bayramın coşkusu yüreğinizi sarsın, her gününüz bayram tadında geçsin. İyi Bayramlar.",
    "Sevdiklerinizle beraber, sağlık ve huzur dolu nice mutlu bayramlara. Bayramınız kutlu olsun.",
    "Dostlukların pekiştiği, dargınlıkların unutulduğu mübarek bayram günleri hepimize hayırlar getirsin."
  ]
};

type Category = 'cuma' | 'kandil' | 'bayram';

const Messages: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<Category>('cuma');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
    if (window.navigator?.vibrate) window.navigator.vibrate(50);
  };

  return (
    <div className={`flex flex-col h-full p-6 animate-in fade-in duration-700 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter mb-2 text-[#FFD700]">Hazır Mesajlar</h2>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Paylaşıma Hazır Sözler</p>
      </div>

      <div className={`flex p-1.5 rounded-2xl border mb-8 ${isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
        {(['cuma', 'kandil', 'bayram'] as Category[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl ${
              activeTab === tab ? 'bg-[#FFD700] text-black shadow-lg' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-24">
        {MESSAGES_DATA[activeTab].map((msg, index) => (
          <div 
            key={`${activeTab}-${index}`}
            className={`relative border rounded-[2rem] p-6 shadow-lg transition-all ${isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-start space-x-4">
              <MessageSquare size={16} className="text-[#FFD700] mt-1 shrink-0" />
              <p className="text-[13px] leading-relaxed italic font-medium">"{msg}"</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleCopy(msg, index)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all active:scale-95 text-[10px] font-black uppercase tracking-widest ${
                  copiedIndex === index ? 'bg-green-600 text-white' : isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedIndex === index ? 'Kopyalandı!' : 'Kopyala'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
