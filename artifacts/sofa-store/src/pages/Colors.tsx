import { motion } from "motion/react";
import { Link } from "wouter";
import { ArrowRight, Palette } from "lucide-react";
import { ScrollToTop } from "../components/ScrollToTop";

const colors = [
  { name: "بيج فاخر", hex: "#C4A882", category: "دافئ" },
  { name: "رمادي بارد", hex: "#808B96", category: "بارد" },
  { name: "بني داكن", hex: "#6E4E37", category: "كلاسيك" },
  { name: "كريمي ناعم", hex: "#F5E6D3", category: "فاتح" },
  { name: "أسود فحمي", hex: "#2C2C2C", category: "داكن" },
  { name: "أبيض لؤلؤي", hex: "#F8F5F0", category: "فاتح" },
  { name: "ذهبي ملكي", hex: "#D4AF37", category: "فاخر" },
  { name: "أزرق ملكي", hex: "#2C3E8C", category: "بارد" },
  { name: "أخضر زيتوني", hex: "#6B7C5C", category: "طبيعي" },
  { name: "بنفسجي عميق", hex: "#4A2C6E", category: "فاخر" },
  { name: "وردي باستيل", hex: "#E8C4C4", category: "دافئ" },
  { name: "أزرق سماوي", hex: "#5B9BD5", category: "بارد" },
  { name: "برتقالي دافئ", hex: "#C47A3A", category: "دافئ" },
  { name: "أخضر نعناع", hex: "#7EC8B0", category: "طبيعي" },
  { name: "أحمر بوردو", hex: "#7C1C2C", category: "داكن" },
  { name: "تركواز فاخر", hex: "#2C8C8C", category: "بارد" },
  { name: "وردي ذهبي", hex: "#D4967C", category: "دافئ" },
  { name: "رمادي دافئ", hex: "#9E9087", category: "محايد" },
  { name: "كحلي أنيق", hex: "#1C2C5E", category: "بارد" },
  { name: "أخضر زمردي", hex: "#1C6E4E", category: "طبيعي" },
  { name: "أصفر خردلي", hex: "#B8942A", category: "دافئ" },
  { name: "بني رملي", hex: "#C4A26E", category: "دافئ" },
  { name: "فيروزي ملكي", hex: "#1C7C8C", category: "بارد" },
  { name: "عاجي كريم", hex: "#EDE0C8", category: "فاتح" },
  { name: "أرجواني ملكي", hex: "#6C2C8C", category: "فاخر" },
];

const categoryColors: Record<string, string> = {
  "دافئ": "bg-orange-500/20 text-orange-300",
  "بارد": "bg-blue-500/20 text-blue-300",
  "كلاسيك": "bg-amber-500/20 text-amber-300",
  "فاتح": "bg-gray-500/20 text-gray-300",
  "داكن": "bg-gray-800/50 text-gray-400",
  "فاخر": "bg-yellow-500/20 text-yellow-300",
  "طبيعي": "bg-green-500/20 text-green-300",
  "محايد": "bg-neutral-500/20 text-neutral-300",
};

export default function Colors() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">
      <ScrollToTop />

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link to="/">
              <button className="flex items-center gap-2 text-[#d4af37] hover:text-[#c9a02e] transition-colors mb-8">
                <ArrowRight className="w-5 h-5" />
                <span>العودة للرئيسية</span>
              </button>
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <Palette className="w-10 h-10 text-[#d4af37]" />
              <h1 className="text-4xl md:text-5xl font-bold">تشكيلة <span className="text-[#d4af37]">الألوان</span></h1>
            </div>
            <div className="w-24 h-1 bg-[#d4af37] mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              أكثر من 25 لون فاخر متوفر بأقمشة عالية الجودة. اختر اللون المثالي الذي يناسب ذوقك وديكور منزلك وتواصل معنا لطلبه.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {colors.map((color, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="group bg-[#1a1a1a] border border-[#d4af37]/20 hover:border-[#d4af37] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d4af37]/10 hover:-translate-y-1"
              >
                <div
                  className="w-full aspect-square transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-3">
                  <p className="text-white font-semibold text-sm mb-1">{color.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[color.category] || "bg-gray-500/20 text-gray-300"}`}>
                    {color.category}
                  </span>
                  <p className="text-gray-500 text-xs mt-1">{color.hex}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-[#d4af37] mb-4">اختر لونك المفضل وتواصل معنا</h3>
            <p className="text-gray-300 mb-6">نوفر لك أي لون تختاره بأقمشة عالية الجودة</p>
            <a
              href="https://wa.me/9647881457896"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              اطلب لونك الآن عبر واتساب
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
