
import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import ManeviCard from './ManeviCard';

interface KazaData {
  sabah: number;
  ogle: number;
  ikindi: number;
  aksam: number;
  yatsi: number;
  vitir: number;
  oruc: number;
}

const STORAGE_KEY = 'islami_yasam_kaza_v2';

const KazaTakibi: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [data, setData] = useState<KazaData>({
    sabah: 0,
    ogle: 0,
    ikindi: 0,
    aksam: 0,
    yatsi: 0,
    vitir: 0,
    oruc: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("LocalStorage yükleme hatası:", e);
      }
    }
  }, []);

  const updateCount = (key: keyof KazaData, amount: number) => {
    setData(prev => {
      const newValue = Math.max(0, prev[key] + amount);
      const newData = { ...prev, [key]: newValue };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
    if (navigator.vibrate) navigator.vibrate(20);
  };

  const handleReset = () => {
    if (window.confirm("Tüm kaza borçlarını sıfırlamak istediğinize emin misiniz?")) {
      const resetData = {
        sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0, oruc: 0
      };
      setData(resetData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
    }
  };

  const categories = [
    { key: 'sabah', label: 'Sabah Namazı' },
    { key: 'ogle', label: 'Öğle Namazı' },
    { key: 'ikindi', label: 'İkindi Namazı' },
    { key: 'aksam', label: 'Akşam Namazı' },
    { key: 'yatsi', label: 'Yatsı Namazı' },
    { key: 'vitir', label: 'Vitir Vacip' },
    { key: 'oruc', label: 'Ramazan Orucu' },
  ];

  return (
    <div className="flex flex-col h-full p-6 animate-in fade-in duration-700">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black tracking-tighter mb-2">Kaza Takibi</h2>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Borç Namaz ve Oruçlarınızı Yönetin</p>
          </div>
          <button 
            onClick={handleReset}
            className={`p-3 border rounded-2xl text-red-500 hover:bg-red-500/10 transition-colors ${isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-gray-200'}`}
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4 pb-12">
        {categories.map((cat) => {
          const key = cat.key as keyof KazaData;
          return (
            <div 
              key={key}
              className={`border p-5 rounded-[2rem] flex items-center justify-between shadow-xl transition-colors ${isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-gray-200'}`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{cat.label}</span>
                <span className={`text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data[key]}</span>
              </div>

              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => updateCount(key, -1)}
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center active:scale-90 transition-transform ${isDarkMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                >
                  <Minus size={20} />
                </button>
                <button 
                  onClick={() => updateCount(key, 1)}
                  className="w-14 h-14 rounded-2xl bg-[#FFD700] flex items-center justify-center active:scale-90 transition-transform shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                >
                  <Plus size={24} className="text-black" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 mb-8">
        <ManeviCard title="Bir Hatırlatma" isDarkMode={isDarkMode} />
      </div>

      <div className={`p-6 border rounded-[2rem] text-center ${isDarkMode ? 'bg-[#FFD700]/5 border-[#FFD700]/10' : 'bg-[#FFD700]/5 border-[#FFD700]/20'}`}>
        <p className="text-[10px] text-[#FFD700] font-black uppercase tracking-widest leading-relaxed">
          Verileriniz telefonunuzun hafızasında (localStorage) saklanmaktadır.
        </p>
      </div>
    </div>
  );
};

export default KazaTakibi;
