
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Info, Loader2 } from 'lucide-react';
import ManeviCard from './ManeviCard';

const NearbyMosques: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setIsLoading(false);
        },
        (err) => {
          setError("Konum izni alınamadı. Lütfen ayarlardan izin verin.");
          setIsLoading(false);
        }
      );
    } else {
      setError("Tarayıcınız konum özelliğini desteklemiyor.");
      setIsLoading(false);
    }
  }, []);

  const openInMaps = () => {
    if (coords) {
      const url = `https://www.google.com/maps/search/camiler/@${coords.lat},${coords.lon},15z`;
      window.open(url, '_blank');
    } else {
      // Fallback if GPS fails but user clicks anyway
      window.open(`https://www.google.com/maps/search/camiler`, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-full p-6 text-white bg-black animate-in fade-in duration-700 overflow-y-auto no-scrollbar pb-24">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter mb-2 text-[#FFD700]">Yakın Camiler</h2>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
          Çevrenizdeki İbadethaneleri Keşfedin
        </p>
      </div>

      {/* Main Radar / Interactive Area */}
      <div className="flex flex-col items-center justify-center space-y-12 my-8">
        <div className="relative">
          {/* Radar Animation Layers */}
          <div className="absolute inset-0 bg-[#FFD700]/20 rounded-full animate-ping scale-150 opacity-20"></div>
          <div className="absolute inset-0 bg-[#FFD700]/10 rounded-full animate-ping scale-125 opacity-30" style={{ animationDelay: '0.5s' }}></div>
          
          <div className="relative z-10 w-48 h-48 bg-gradient-to-br from-[#161616] to-[#0a0a0a] rounded-full border border-white/10 flex items-center justify-center shadow-2xl">
             <div className="flex flex-col items-center">
                <MapPin size={48} className="text-[#FFD700] mb-2 animate-bounce" />
                <div className="flex space-x-1">
                   <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse"></div>
                   <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse delay-75"></div>
                   <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse delay-150"></div>
                </div>
             </div>
          </div>
        </div>

        <div className="text-center space-y-2">
           <h3 className="text-lg font-black uppercase tracking-tighter">Konum Taraması</h3>
           <p className="text-[11px] text-gray-500 font-medium max-w-[250px] mx-auto leading-relaxed">
             {isLoading ? "GPS verileri alınıyor..." : error ? error : "Bulunduğunuz konuma en yakın camiler aranıyor..."}
           </p>
        </div>

        <button 
          onClick={openInMaps}
          className="group w-full max-w-xs bg-[#FFD700] text-black font-black py-5 rounded-[2rem] flex items-center justify-center space-x-4 shadow-[0_20px_40px_rgba(255,215,0,0.2)] active:scale-95 transition-all"
        >
          <Navigation size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest">HARİTADA GÖSTER 📍</span>
        </button>
      </div>

      <div className="mt-8">
        <ManeviCard />
      </div>

      {/* Footer Info */}
      <div className="py-8 text-center">
        <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">
          GPS verileri cihazınızdan anlık olarak alınır.
        </p>
      </div>
    </div>
  );
};

export default NearbyMosques;
