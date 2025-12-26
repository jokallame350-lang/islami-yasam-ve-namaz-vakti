
import React, { useState } from 'react';
import { Wallet, Landmark, Package, HandCoins, Info, Calculator, ReceiptText } from 'lucide-react';
import ManeviCard from './ManeviCard';

const ZekatHesapla: React.FC = () => {
  const [inputs, setInputs] = useState({
    nakit: '',
    altin: '',
    mal: '',
    borc: ''
  });

  const [result, setResult] = useState<{
    netWealth: number;
    zekatAmount: number;
    isEligible: boolean;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setInputs(prev => ({ ...prev, [name]: value }));
    }
  };

  const calculateZekat = () => {
    const nakitVal = parseFloat(inputs.nakit) || 0;
    const altinVal = parseFloat(inputs.altin) || 0;
    const malVal = parseFloat(inputs.mal) || 0;
    const borcVal = parseFloat(inputs.borc) || 0;

    const netWealth = (nakitVal + altinVal + malVal) - borcVal;
    
    if (netWealth > 0) {
      setResult({
        netWealth,
        zekatAmount: netWealth * 0.025, // 2.5% or 1/40
        isEligible: true
      });
    } else {
      setResult({
        netWealth: Math.max(0, netWealth),
        zekatAmount: 0,
        isEligible: false
      });
    }

    if (navigator.vibrate) navigator.vibrate(50);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="flex flex-col h-full p-6 text-white bg-black animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter mb-2">Zekat Hesapla</h2>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Diyanet Usulü Zekat Hesaplayıcı</p>
      </div>

      {/* Info Box */}
      <div className="mb-8 p-5 bg-[#FFD700]/5 border border-[#FFD700]/10 rounded-[1.8rem] flex items-start space-x-4">
        <div className="bg-[#FFD700]/10 p-2.5 rounded-xl">
          <Info size={18} className="text-[#FFD700]" />
        </div>
        <div>
          <p className="text-[10px] text-[#FFD700] font-black uppercase tracking-widest mb-1">Nisab Bilgisi</p>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Nisab Miktarı: <span className="text-white font-bold">80.18 gr Altın</span> veya karşılığı paradır. Borçlarınızdan arta kalan bu miktarı 1 yıldır elinizde tutuyorsanız zekat farzdır.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Landmark size={18} className="text-gray-500 group-focus-within:text-[#FFD700] transition-colors" />
          </div>
          <input
            type="text"
            name="nakit"
            value={inputs.nakit}
            onChange={handleInputChange}
            placeholder="Nakit ve Banka Varlıkları (TL)"
            className="w-full bg-[#111111] border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-5 text-sm font-bold focus:outline-none focus:border-[#FFD700]/30 transition-all placeholder:text-gray-700"
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Wallet size={18} className="text-gray-500 group-focus-within:text-[#FFD700] transition-colors" />
          </div>
          <input
            type="text"
            name="altin"
            value={inputs.altin}
            onChange={handleInputChange}
            placeholder="Altın ve Döviz (TL Karşılığı)"
            className="w-full bg-[#111111] border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-5 text-sm font-bold focus:outline-none focus:border-[#FFD700]/30 transition-all placeholder:text-gray-700"
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Package size={18} className="text-gray-500 group-focus-within:text-[#FFD700] transition-colors" />
          </div>
          <input
            type="text"
            name="mal"
            value={inputs.mal}
            onChange={handleInputChange}
            placeholder="Ticari Mallar (TL Değeri)"
            className="w-full bg-[#111111] border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-5 text-sm font-bold focus:outline-none focus:border-[#FFD700]/30 transition-all placeholder:text-gray-700"
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <HandCoins size={18} className="text-red-900 group-focus-within:text-red-500 transition-colors" />
          </div>
          <input
            type="text"
            name="borc"
            value={inputs.borc}
            onChange={handleInputChange}
            placeholder="Toplam Borçlarınız (TL)"
            className="w-full bg-[#111111] border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-5 text-sm font-bold focus:outline-none focus:border-red-500/20 transition-all placeholder:text-gray-700"
          />
        </div>
      </div>

      <button
        onClick={calculateZekat}
        className="w-full bg-[#FFD700] text-black font-black py-5 rounded-[1.5rem] shadow-[0_10px_30px_rgba(255,215,0,0.2)] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 text-sm uppercase tracking-widest"
      >
        <Calculator size={20} />
        <span>HESAPLA</span>
      </button>

      {/* Result Display */}
      {result && (
        <div className="mt-8 animate-in slide-in-from-bottom duration-500">
          {result.isEligible ? (
            <div className="bg-gradient-to-br from-[#161616] to-[#0a0a0a] border border-[#FFD700]/20 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-[#FFD700] p-2 rounded-lg">
                  <ReceiptText size={20} className="text-black" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#FFD700]">Hesaplama Özeti</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Toplam Net Varlık</p>
                  <p className="text-3xl font-black tracking-tighter text-white">{formatCurrency(result.netWealth)}</p>
                </div>
                
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] text-[#FFD700] font-black uppercase tracking-widest mb-1">Verilmesi Gereken Zekat (%2.5)</p>
                  <p className="text-5xl font-black tracking-tighter text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                    {formatCurrency(result.zekatAmount)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 text-center">
              <p className="text-gray-500 text-sm font-bold leading-relaxed">
                Hesaplanan net varlığınız zekat mükellefiyeti için yeterli seviyede değildir. 
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8">
        <ManeviCard title="Zekatın Önemi" />
      </div>

      <div className="mt-auto py-8">
        <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em] text-center leading-relaxed px-4">
          Zekat vermek malı temizler ve bereketi artırır.
        </p>
      </div>
    </div>
  );
};

export default ZekatHesapla;
