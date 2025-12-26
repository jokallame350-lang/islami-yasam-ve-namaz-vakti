
import React, { useState, useEffect } from 'react';
import { Compass as CompassIcon, ShieldCheck, MapPin } from 'lucide-react';

const Qibla: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + (Math.random() - 0.5) * 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-white text-center animate-in slide-in-from-right duration-700 bg-transparent">
      <div className="mb-12">
        <h2 className="text-3xl font-black mb-3 tracking-tighter text-[#FFD700]">Kıble Pusulası</h2>
        <div className="flex items-center justify-center space-x-2 text-gray-300 text-xs font-bold uppercase tracking-widest">
          <MapPin size={12} className="text-[#FFD700]" />
          <span>Konum Aktif</span>
        </div>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#FFD700]/10 rounded-full blur-[100px] animate-pulse"></div>
        
        {/* Outer Visual Guides */}
        <div className="absolute inset-0 border-2 border-white/10 rounded-full backdrop-blur-sm"></div>
        <div className="absolute inset-8 border border-white/10 rounded-full border-dashed opacity-50"></div>
        
        {/* Cardinal Markers */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between items-center text-[10px] text-gray-400 font-black">
          <span className="text-red-500">K</span>
          <div className="flex justify-between w-full">
            <span>B</span>
            <span>D</span>
          </div>
          <span>G</span>
        </div>

        {/* Rotating Mechanism */}
        <div 
          className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Main Needle North */}
          <div className="absolute w-2.5 h-36 bg-gradient-to-t from-transparent via-red-500 to-red-600 rounded-full -translate-y-18 shadow-[0_0_20px_rgba(239,68,68,0.5)]"></div>
          {/* Main Needle South */}
          <div className="absolute w-2.5 h-36 bg-gradient-to-b from-transparent via-gray-400 to-gray-600 rounded-full translate-y-18"></div>
          
          {/* Kaaba Direction Marker */}
          <div className="absolute" style={{ transform: `rotate(145deg) translateY(-125px)` }}>
             <div className="bg-[#FFD700] p-2.5 rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.6)] border-2 border-white/20 scale-110">
                <div className="w-6 h-6 bg-black rounded-lg relative overflow-hidden">
                   <div className="absolute top-1/2 w-full h-0.5 bg-[#FFD700]/60"></div>
                </div>
             </div>
          </div>
          
          {/* Center Hub */}
          <div className="w-10 h-10 bg-black/80 rounded-full z-10 border-4 border-white/20 shadow-2xl flex items-center justify-center">
             <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full max-w-xs space-y-4">
        <div className="bg-black/30 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 flex items-center justify-between shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="bg-[#FFD700]/20 p-3 rounded-2xl">
              <CompassIcon className="text-[#FFD700]" size={24} />
            </div>
            <div className="text-left">
              <p className="text-[9px] text-[#FFD700]/80 uppercase font-black tracking-widest mb-0.5">Kaabe Açısı</p>
              <p className="text-2xl font-black text-white leading-none">145.2°</p>
            </div>
          </div>
          <div className="bg-[#006400]/20 px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-[#006400]/40">
            <ShieldCheck size={14} className="text-[#FFD700]" />
            <span className="text-[10px] text-white font-black">HASSAS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qibla;
