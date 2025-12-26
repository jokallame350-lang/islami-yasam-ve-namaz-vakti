
import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';

const ESMA_DATA = [
  { arabic: "اللَّهُ", reading: "Allah", meaning: "Eşi benzeri olmayan, tek ilah." },
  { arabic: "الرَّحْمَنُ", reading: "Er-Rahmân", meaning: "Dünyadaki tüm varlıklara şefkat gösteren." },
  { arabic: "الرَّحِيمُ", reading: "Er-Rahîm", meaning: "Ahirette sadece müminlere merhamet eden." },
  { arabic: "الْمَلِكُ", reading: "El-Melik", meaning: "Tüm kâinatın gerçek sahibi ve hükümdarı." },
  { arabic: "الْقُدُّوسُ", reading: "El-Kuddûs", meaning: "Her türlü eksiklikten uzak, tertemiz." },
  { arabic: "السَّلَامُ", reading: "Es-Selâm", meaning: "Esenlik veren, tehlikelerden kurtaran." },
  { arabic: "الْمُؤْمِنُ", reading: "El-Mü'min", meaning: "Güven veren, vaadine sadık olan." },
  { arabic: "الْمُهَيْمِنُ", reading: "El-Müheymin", meaning: "Görüp gözeten, her şeyi kontrol altında tutan." },
  { arabic: "الْعَزِيزُ", reading: "El-Azîz", meaning: "İzzet sahibi, mağlup edilmesi imkânsız olan." },
  { arabic: "الْجَبَّارُ", reading: "El-Cebbâr", meaning: "Dilediğini zorla yaptıran, yaraları saran." },
  { arabic: "الْمُتَكَبِّرُ", reading: "El-Mütekebbir", meaning: "Büyüklükte eşi benzeri olmayan." },
  { arabic: "الْخَالِقُ", reading: "El-Hâlık", meaning: "Yoktan var eden, yaratan." },
  { arabic: "الْبَارِئُ", reading: "El-Bâri", meaning: "Her şeyi kusursuz ve uyumlu yaratan." },
  { arabic: "الْمُصَوِّرُ", reading: "El-Musavvir", meaning: "Her varlığa kendine has suret veren." },
  { arabic: "الْغَفَّارُ", reading: "El-Gaffâr", meaning: "Mağfireti çok, günahları örten." },
  { arabic: "الْقَهَّارُ", reading: "El-Kahhâr", meaning: "Her şeye galip gelen, gücü yeten." },
  { arabic: "الْوَهَّابُ", reading: "El-Vehhâb", meaning: "Karşılıksız veren, ihsanı bol." },
  { arabic: "الرَّزَّاقُ", reading: "Er-Rezzâk", meaning: "Rızık veren, rızkı yaratan." },
  { arabic: "الْفَتَّاحُ", reading: "El-Fettâh", meaning: "Hayır kapılarını açan, zafer veren." },
  { arabic: "الْعَلِيمُ", reading: "El-Alîm", meaning: "Her şeyi en ince ayrıntısıyla bilen." },
  { arabic: "الْقَابِضُ", reading: "El-Kâbıd", meaning: "Dilediğine rızkı daraltan, can alan." },
  { arabic: "الْبَاسِطُ", reading: "El-Bâsıt", meaning: "Rızkı genişleten, ferahlık veren." },
  { arabic: "الْخَافِضُ", reading: "El-Hâfıd", meaning: "Dereceleri alçaltan, zelil kılan." },
  { arabic: "الرَّافِعُ", reading: "Er-Râfi", meaning: "Dereceleri yükselten, aziz kılan." },
  { arabic: "الْمُعِزُّ", reading: "El-Muizz", meaning: "İzzet ve şeref veren." },
  { arabic: "الْمُذِلُّ", reading: "El-Müzill", meaning: "Zelil kılan, alçaltan." },
  { arabic: "السَّمِيعُ", reading: "Es-Semî", meaning: "Her şeyi işiten." },
  { arabic: "الْبَصِيرُ", reading: "El-Basîr", meaning: "Her şeyi gören." },
  { arabic: "الْحَكَمُ", reading: "El-Hakem", meaning: "Hükmeden, hakkı yerine getiren." },
  { arabic: "الْعَدْلُ", reading: "El-Adl", meaning: "Sonsuz adalet sahibi." },
  { arabic: "اللَّطِيفُ", reading: "El-Latîf", meaning: "Lütuf sahibi, her şeye nüfuz eden." },
  { arabic: "الْخَبِيرُ", reading: "El-Habîr", meaning: "Her şeyden haberdar olan." },
  { arabic: "الْحَلِيمُ", reading: "El-Halîm", meaning: "Cezada acele etmeyen, yumuşak davranan." },
  { arabic: "الْعَظِيمُ", reading: "El-Azîm", meaning: "Pek yüce, azametli." },
  { arabic: "الْغَفُورُ", reading: "El-Gafûr", meaning: "Mağfireti çok, affeden." },
  { arabic: "الشَّكُورُ", reading: "Eş-Şekûr", meaning: "Az amele çok sevap veren." },
  { arabic: "الْعَلِيُّ", reading: "El-Aliyy", meaning: "Yücelerin yücesi." },
  { arabic: "الْكَبِيرُ", reading: "El-Kebîr", meaning: "En büyük, mukayese edilemez." },
  { arabic: "الْحَفِيظُ", reading: "El-Hafîz", meaning: "Koruyan, muhafaza eden." },
  { arabic: "الْمُقِيتُ", reading: "El-Mukît", meaning: "Her türlü rızkı veren, bilen." },
  { arabic: "الْحَسِيبُ", reading: "El-Hasîb", meaning: "Hesaba çeken, her şeye yeten." },
  { arabic: "الْجَلِILُ", reading: "El-Celîl", meaning: "Celalet ve heybet sahibi." },
  { arabic: "الْكَرِيمُ", reading: "El-Kerîm", meaning: "Çok cömert, lütufkâr." },
  { arabic: "الرَّقِيبُ", reading: "Er-Rakîb", meaning: "Gözetleyen, her an gören." },
  { arabic: "الْمُجِيبُ", reading: "El-Mucîb", meaning: "Duaları kabul eden." },
  { arabic: "الْوَاسِعُ", reading: "El-Vâsi", meaning: "İlmi ve merhameti her şeyi kuşatan." },
  { arabic: "الْحَكِيمُ", reading: "El-Hakîm", meaning: "Hikmet sahibi, her işi yerli yerinde." },
  { arabic: "الْوَدُودُ", reading: "El-Vedûd", meaning: "Seven ve sevilmeye layık olan." },
  { arabic: "الْمَجِيدُ", reading: "El-Mecîd", meaning: "Şerefi çok yüce olan." },
  { arabic: "الْبَاعِثُ", reading: "El-Bâis", meaning: "Ölüleri dirilten." },
  { arabic: "الشَّهِيدُ", reading: "Eş-Şehîd", meaning: "Her şeye şahit olan." },
  { arabic: "الْحَقُّ", reading: "El-Hakk", meaning: "Varlığı hiç değişmeyen, gerçek." },
  { arabic: "الْوَكِيلُ", reading: "El-Vekîl", meaning: "Güvenilip dayanılan, işleri düzelten." },
  { arabic: "الْقَوِيُّ", reading: "El-Kaviyy", meaning: "Pek güçlü, kudretli." },
  { arabic: "الْمَتِينُ", reading: "El-Metîn", meaning: "Çok sağlam, sarsılmaz." },
  { arabic: "الْوَلِيُّ", reading: "El-Veliyy", meaning: "Dost ve yardımcı olan." },
  { arabic: "الْحَمِيدُ", reading: "El-Hamîd", meaning: "Övülmeye layık olan." },
  { arabic: "الْمُحْصِي", reading: "El-Muhsî", meaning: "Sayılarını bilen, kuşatan." },
  { arabic: "الْمُBDIئُ", reading: "El-Mübdi", meaning: "Maddesiz ve örneksiz yaratan." },
  { arabic: "الْمُعِيدُ", reading: "El-Muîd", meaning: "Yeniden dirilten." },
  { arabic: "الْمُHİYİ", reading: "El-Muhyî", meaning: "Can veren, hayat bahşeden." },
  { arabic: "الْمُمِيتُ", reading: "El-Mümît", meaning: "Ölümü yaratan, can alan." },
  { arabic: "الْحَيُّ", reading: "El-Hayy", meaning: "Diri, sonsuz hayat sahibi." },
  { arabic: "الْقَيُّومُ", reading: "El-Kayyûm", meaning: "Kâinatı ayakta tutan." },
  { arabic: "الْوَاجِدُ", reading: "El-Vâcid", meaning: "İstediğini bulan, zengin." },
  { arabic: "الْمَACİDُ", reading: "El-Mâcid", meaning: "Kadr-ü şanı büyük olan." },
  { arabic: "الْوَاحِدُ", reading: "El-Vâhid", meaning: "Tek ve benzersiz." },
  { arabic: "الصَّمَدُ", reading: "Es-Samed", meaning: "Herkesin muhtaç olduğu, kimseye muhtaç olmayan." },
  { arabic: "الْقَادِرُ", reading: "El-Kâdir", meaning: "Dilediğini yapmaya gücü yeten." },
  { arabic: "الْمُQTEDİrُ", reading: "El-Muktedir", meaning: "Her şeye gücü yeten, tasarruf eden." },
  { arabic: "الْمُQADDİmُ", reading: "El-Mukaddim", meaning: "Dilediğini öne alan." },
  { arabic: "الْمُUAHHİrُ", reading: "El-Muahhir", meaning: "Dilediğini geriye bırakan." },
  { arabic: "الْأَوَّلُ", reading: "El-Evvel", meaning: "Başlangıcı olmayan." },
  { arabic: "الْآخِرُ", reading: "El-Âhir", meaning: "Sonu olmayan." },
  { arabic: "الظَّاهِرُ", reading: "Ez-Zâhir", meaning: "Varlığı her şeyle aşikâr olan." },
  { arabic: "الْبَاطِنُ", reading: "El-Bâtın", meaning: "Zatıyla gizli olan." },
  { arabic: "الْوَالِي", reading: "El-Vâlî", meaning: "İdare eden, yöneten." },
  { arabic: "الْمُTEÂLÎ", reading: "El-Müteâlî", meaning: "Pek yüce olan." },
  { arabic: "الْبَرُّ", reading: "El-Berr", meaning: "İyilik ve ihsanı bol olan." },
  { arabic: "التَّوَّابُ", reading: "Et-Tevvâb", meaning: "Tövbeleri kabul eden." },
  { arabic: "الْمُNTEKİMُ", reading: "El-Müntekim", meaning: "Suçluları cezalandıran." },
  { arabic: "الْعَفُوُّ", reading: "El-Afüvv", meaning: "Affı çok olan, silen." },
  { arabic: "الرَّؤُوفُ", reading: "Er-Raûf", meaning: "Çok şefkatli." },
  { arabic: "مَالِكُ الْمُلْكِ", reading: "Mâlikü'l-Mülk", meaning: "Mülkün ebedi sahibi." },
  { arabic: "ذُو الْجَلَالِ وَالْإِكْرَامِ", reading: "Zü'l-Celâli ve'l-İkrâm", meaning: "Celal ve kerem sahibi." },
  { arabic: "الْمُQSİTُ", reading: "El-Muksit", meaning: "Hükmünde adil olan." },
  { arabic: "الْجَامِعُ", reading: "El-Câmi", meaning: "İstediğini bir araya getiren." },
  { arabic: "الْغَنِيُّ", reading: "El-Ganiyy", meaning: "Pek zengin, muhtaç olmayan." },
  { arabic: "الْمُGNÎ", reading: "El-Mugnî", meaning: "Zenginlik veren." },
  { arabic: "الْمَانِعُ", reading: "El-Mâni", meaning: "Dilediğine engel olan." },
  { arabic: "الضَّارُّ", reading: "Ed-Dârr", meaning: "Zarar verenleri yaratan." },
  { arabic: "النَّافِعُ", reading: "En-Nâfi", meaning: "Hayır ve menfaat veren." },
  { arabic: "النُّورُ", reading: "En-Nûr", meaning: "Aydınlatan, nurlandıran." },
  { arabic: "الْهَادِي", reading: "El-Hâdi", meaning: "Hidayet veren, doğruya ileten." },
  { arabic: "الْبَدِيعُ", reading: "El-Bedî", meaning: "Eşsiz yaratan." },
  { arabic: "الْبَاقِي", reading: "El-Bâkî", meaning: "Varlığı ebedi olan." },
  { arabic: "الْوَارِثُ", reading: "El-Vâris", meaning: "Her şeyin son sahibi." },
  { arabic: "الرَّشِيدُ", reading: "Er-Reşîd", meaning: "Doğru yolu gösteren." },
  { arabic: "الصَّبُورُ", reading: "Es-Sabûr", meaning: "Çok sabırlı." }
];

const Esma: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNames = ESMA_DATA.filter(item => 
    item.reading.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full p-6 text-white bg-transparent animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter mb-2 text-[#FFD700]">Esma-ül Hüsna</h2>
        <p className="text-[10px] text-gray-300/60 font-black uppercase tracking-widest">Allah'ın 99 İsmi ve Anlamları</p>
      </div>

      {/* Search Box */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search size={18} className="text-[#FFD700]" />
        </div>
        <input 
          type="text" 
          placeholder="İsim veya anlam ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-sm font-medium focus:outline-none focus:border-[#FFD700]/50 transition-colors placeholder:text-gray-500 shadow-xl"
        />
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-2 gap-4 pb-12">
        {filteredNames.map((item, index) => (
          <div 
            key={index} 
            className="group relative bg-black/30 backdrop-blur-md rounded-[2rem] p-5 border border-white/10 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-black/50"
          >
            {/* Index Badge */}
            <div className="absolute top-3 left-4 text-[9px] font-black text-[#FFD700]/40">
              #{index + 1}
            </div>
            
            <div className="mb-4 pt-2">
              <span className="text-3xl font-black text-[#FFD700] drop-shadow-[0_4px_12px_rgba(255,215,0,0.4)] font-serif" dir="rtl">
                {item.arabic}
              </span>
            </div>
            
            <div className="w-full">
              <h3 className="text-[13px] font-black uppercase tracking-widest text-white mb-1">
                {item.reading}
              </h3>
              <p className="text-[10px] text-gray-300 leading-tight font-medium">
                {item.meaning}
              </p>
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute -bottom-2 w-1/2 h-1 bg-[#FFD700]/0 group-hover:bg-[#FFD700]/20 blur-xl transition-all"></div>
          </div>
        ))}
      </div>
      
      {filteredNames.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="font-bold text-sm">Sonuç bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default Esma;
