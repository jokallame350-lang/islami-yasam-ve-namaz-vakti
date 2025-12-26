
import React, { useState, useEffect } from 'react';
import { Loader2, CalendarRange, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarDay {
  timings: Record<string, string>;
  date: {
    gregorian: { day: string; month: { en: string; number: number }; year: string; date: string };
    hijri: { day: string; month: { en: string; ar: string }; year: string };
  };
}

const DEFAULT_COORDS = { lat: 41.0082, lon: 28.9784, city: "İstanbul" };

const Imsakiye: React.FC = () => {
  const [data, setData] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState<string>('Konum aranıyor...');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchCalendar = async (lat: number, lon: number, cityName: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lon}&method=13&month=${month}&year=${year}`
      );
      const result = await response.json();
      if (result.code === 200) {
        setData(result.data);
        setCity(cityName);
      }
    } catch (err) {
      console.error("Takvim verisi çekilemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCityName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=tr`);
      const geoData = await response.json();
      return geoData.locality || geoData.city || "Konum Belirlenemedi";
    } catch {
      return "Konum Belirlenemedi";
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const name = await getCityName(pos.coords.latitude, pos.coords.longitude);
          fetchCalendar(pos.coords.latitude, pos.coords.longitude, name);
        },
        () => fetchCalendar(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon, DEFAULT_COORDS.city)
      );
    } else {
      fetchCalendar(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon, DEFAULT_COORDS.city);
    }
  }, [month, year]);

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const today = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white bg-black islamic-pattern">
        <Loader2 className="animate-spin text-[#FFD700] mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">İmsakiye Hazırlanıyor...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 text-white bg-black islamic-pattern overflow-y-auto no-scrollbar pb-24">
      <div className="mb-6 flex justify-between items-start">
        <div className="max-w-[80%]">
          <h2 className="text-3xl font-black tracking-tighter mb-1">Aylık İmsakiye</h2>
          <div className="flex items-center space-x-2">
            <MapPin size={12} className="text-[#FFD700] shrink-0" />
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest truncate">{city}</p>
          </div>
        </div>
        <div className="bg-[#111111] p-3 rounded-2xl border border-white/5">
          <CalendarRange size={20} className="text-gray-400" />
        </div>
      </div>

      <div className="flex items-center justify-between bg-[#111111] rounded-2xl p-2 border border-white/5 mb-6">
        <button 
          onClick={handlePrevMonth}
          className="p-2 hover:bg-white/5 rounded-xl text-gray-400 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-xs font-black uppercase tracking-widest">
          {monthNames[month - 1]} {year}
        </span>
        <button 
          onClick={handleNextMonth}
          className="p-2 hover:bg-white/5 rounded-xl text-gray-400 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] shadow-2xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#111111] border-b border-white/5">
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center sticky left-0 bg-[#111111]">Gün</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">İmsak</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Güneş</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Öğle</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">İkindi</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Akşam</th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Yatsı</th>
              </tr>
            </thead>
            <tbody>
              {data.map((day, idx) => {
                const dayNum = parseInt(day.date.gregorian.day);
                const isToday = dayNum === today && month === currentMonth && year === currentYear;
                return (
                  <tr 
                    key={idx} 
                    className={`border-b border-white/5 transition-colors ${isToday ? 'bg-[#FFD700]/10' : 'hover:bg-white/5'}`}
                  >
                    <td className={`p-4 text-center sticky left-0 font-black text-xs ${isToday ? 'bg-[#FFD700] text-black' : 'bg-[#0a0a0a] text-gray-400'}`}>
                      {dayNum}
                    </td>
                    <td className={`p-4 text-xs font-bold ${isToday ? 'text-[#FFD700]' : 'text-white'}`}>{day.timings.Fajr.split(' ')[0]}</td>
                    <td className="p-4 text-xs font-bold text-gray-400">{day.timings.Sunrise.split(' ')[0]}</td>
                    <td className="p-4 text-xs font-bold text-gray-400">{day.timings.Dhuhr.split(' ')[0]}</td>
                    <td className="p-4 text-xs font-bold text-gray-400">{day.timings.Asr.split(' ')[0]}</td>
                    <td className={`p-4 text-xs font-bold ${isToday ? 'text-[#FFD700]' : 'text-white'}`}>{day.timings.Maghrib.split(' ')[0]}</td>
                    <td className="p-4 text-xs font-bold text-gray-400">{day.timings.Isha.split(' ')[0]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Imsakiye;
