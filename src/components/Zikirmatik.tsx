
import React, { useState } from 'react';
import { RotateCcw, Plus, List, Trophy } from 'lucide-react';

const Zikirmatik: React.FC = () => {
  const [count, setCount] = useState(0);
  const target = 33;

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(40);
  };

  const handleReset = () => {
    if (window.confirm('Sayacı sıfırlamak istiyor musunuz?')) {
      setCount(0);
    }
  };

  const progress = (count % target) / target * 100;

  return (
    <div className="flex flex-col items-center h-full p-8 text-white animate-in slide-in-from-right duration-700 bg-transparent">
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black tracking-tighter text-[#FFD700]">Zikirmatik</h2>
        <div className="flex space-x-2">
           <button className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10">
             <Trophy size={18} className="text-[#FFD700]" />
           </button>
           <button className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10">
             <List size={18} className="text-gray-300" />
           </button>
        </div>
      </div>

      {/* Header Progress Bar */}
      <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mb-16 shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-[#006400] to-[#FFD700] transition-all duration-700 shadow-[0_0_20px_rgba(255,215,0,0.5)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main Counter Hub */}
      <div className="relative w-full flex flex-col items-center mb-16">
         <div className="absolute -top-10 opacity-20 blur-3xl bg-[#FFD700] w-48 h-48 rounded-full"></div>
         <div className="text-[9rem] font-black leading-none tracking-tighter text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] animate-in zoom-in duration-500">
            {count}
         </div>
         <div className="mt-4 bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/10">
            <span className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.3em]">Toplam Tesbih</span>
         </div>
      </div>

      {/* Action Button Section */}
      <div className="w-full flex-1 flex flex-col justify-end space-y-8 pb-4">
        <button 
          onClick={handleIncrement}
          className="group relative w-full aspect-square max-h-[260px] bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center border border-white/10 transition-all active:scale-90"
        >
          {/* Circular Pulse Effect */}
          <div className="absolute inset-0 bg-[#FFD700]/5 rounded-[3.5rem] group-active:bg-[#FFD700]/20 transition-colors"></div>
          
          <div className="relative z-10 bg-[#FFD700] p-7 rounded-full mb-5 shadow-[0_0_40px_rgba(255,215,0,0.4)] group-active:scale-110 transition-transform">
            <Plus size={44} className="text-black" />
          </div>
          <span className="relative z-10 text-white text-base font-black uppercase tracking-[0.2em] drop-shadow-lg group-active:text-[#FFD700]">SUBHÂNALLÂH</span>
        </button>

        <div className="flex justify-between items-center px-4">
           <button 
             onClick={handleReset}
             className="flex items-center space-x-2 text-gray-300 font-black hover:text-red-500 transition-colors group"
           >
             <RotateCcw size={16} className="group-active:rotate-180 transition-transform duration-500" />
             <span className="text-[10px] uppercase tracking-widest">Sıfırla</span>
           </button>
           
           <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-[10px] text-gray-200 font-black uppercase tracking-widest">
             Hedef Tur: <span className="text-[#FFD700] ml-1">{Math.floor(count / target) + 1}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Zikirmatik;
