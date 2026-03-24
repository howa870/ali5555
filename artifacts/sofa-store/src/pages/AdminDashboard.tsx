import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Image, MessageSquare, Phone, LogOut, LayoutDashboard,
  Upload, Trash2, Plus, X, Star, RotateCcw, Home, Save, CheckCircle, Settings
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "wouter";

interface Testimonial {
  id: number;
  rating: number;
  comment: string;
}

const defaultGalleryImages = [
  "https://images.unsplash.com/photo-1762803842055-de1e5fb14477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBzb2ZhJTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzc0MTYzNDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1683793837504-318275ff665d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwdmVsdmV0JTIwY291Y2glMjBnb2xkfGVufDF8fHx8MTc3NDE2MzQ3OXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1707299231603-6c0a93e0f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGl2aW5nJTIwcm9vbSUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NzQxMjkwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
];

const defaultTestimonials: Testimonial[] = [
  { id: 1, rating: 5, comment: "شغلهم نظيف والتفصيل دقيق جداً 👌" },
  { id: 2, rating: 5, comment: "أفضل مكان طلبت منه قنفات ودواوين بصراحة" },
  { id: 3, rating: 5, comment: "سعر مناسب وجودة عالية" }
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"gallery" | "testimonials" | "contact" | "settings">("gallery");
  const [toast, setToast] = useState("");

  const [galleryImages, setGalleryImages] = useState<string[]>(() => {
    const saved = localStorage.getItem("homeGalleryImages");
    return saved ? JSON.parse(saved) : defaultGalleryImages;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem("testimonials");
    return saved ? JSON.parse(saved) : defaultTestimonials;
  });

  const [contactInfo, setContactInfo] = useState(() => {
    const saved = localStorage.getItem("contactInfo");
    return saved ? JSON.parse(saved) : { phone: "+9647881457896", whatsapp: "9647881457896" };
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : { title: "قنفات ودواوين فخمة", subtitle: "تفصيل وبيع بأعلى جودة", button: "اطلب الآن" };
  });

  const [newTestimonial, setNewTestimonial] = useState({ rating: 5, comment: "" });
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const saveGallery = (imgs: string[]) => {
    setGalleryImages(imgs);
    localStorage.setItem("homeGalleryImages", JSON.stringify(imgs));
    showToast("تم حفظ المعرض ✅");
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImgs = [...galleryImages];
      newImgs[index] = reader.result as string;
      saveGallery(newImgs);
    };
    reader.readAsDataURL(file);
  };

  const deleteImage = (index: number) => {
    const newImgs = galleryImages.filter((_, i) => i !== index);
    saveGallery(newImgs);
  };

  const resetGallery = () => {
    if (confirm("إعادة تعيين جميع الصور للافتراضية؟")) saveGallery(defaultGalleryImages);
  };

  const saveTestimonials = (list: Testimonial[]) => {
    setTestimonials(list);
    localStorage.setItem("testimonials", JSON.stringify(list));
    showToast("تم حفظ التعليقات ✅");
  };

  const addTestimonial = () => {
    if (!newTestimonial.comment.trim()) return;
    const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
    saveTestimonials([...testimonials, { ...newTestimonial, id: newId }]);
    setNewTestimonial({ rating: 5, comment: "" });
    setShowAddTestimonial(false);
  };

  const saveContact = () => {
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
    showToast("تم حفظ معلومات التواصل ✅");
  };

  const saveSettings = () => {
    localStorage.setItem("settings", JSON.stringify(siteSettings));
    showToast("تم حفظ إعدادات الموقع ✅");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = [
    { id: "gallery", label: "المعرض", icon: Image },
    { id: "testimonials", label: "التعليقات", icon: MessageSquare },
    { id: "contact", label: "التواصل", icon: Phone },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl font-bold flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          {toast}
        </motion.div>
      )}

      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#d4af37]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#d4af37]/10 p-2 rounded-lg border border-[#d4af37]/30">
            <LayoutDashboard className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
            <p className="text-xs text-[#d4af37]">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">الموقع</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[#1a1a1a] p-1.5 rounded-xl border border-[#d4af37]/10 w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
                activeTab === id
                  ? "bg-[#d4af37] text-black"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#d4af37]">إدارة المعرض</h2>
                <p className="text-gray-400 text-sm mt-1">{galleryImages.length} صورة</p>
              </div>
              <button
                onClick={resetGallery}
                className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                إعادة التعيين
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#1a1a1a] border border-[#d4af37]/20 rounded-xl overflow-hidden group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={img} alt={`صورة ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <label className="cursor-pointer bg-[#d4af37] text-black px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-[#c9a02e] transition-colors">
                        <Upload className="w-4 h-4" />
                        استبدال
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(index, e)} />
                      </label>
                      <button
                        onClick={() => deleteImage(index)}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        حذف
                      </button>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#d4af37] text-black w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="p-3 flex gap-2">
                    <label className="flex-1 cursor-pointer bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/20 text-[#d4af37] px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      رفع صورة
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(index, e)} />
                    </label>
                    <button
                      onClick={() => deleteImage(index)}
                      className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#d4af37]">إدارة التعليقات</h2>
                <p className="text-gray-400 text-sm mt-1">{testimonials.length} تعليق</p>
              </div>
              <button
                onClick={() => setShowAddTestimonial(true)}
                className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#c9a02e] text-black px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                <Plus className="w-4 h-4" />
                إضافة تعليق
              </button>
            </div>

            {showAddTestimonial && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#d4af37]">تعليق جديد</h3>
                  <button onClick={() => setShowAddTestimonial(false)} className="text-gray-500 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">التقييم</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          onClick={() => setNewTestimonial({ ...newTestimonial, rating: i })}
                          className={`w-7 h-7 cursor-pointer transition-colors ${i <= newTestimonial.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">التعليق</p>
                    <textarea
                      value={newTestimonial.comment}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                      className="w-full h-24 bg-[#0a0a0a] border border-[#d4af37]/20 focus:border-[#d4af37] p-3 rounded-lg text-white resize-none outline-none"
                      placeholder="اكتب التعليق هنا..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={addTestimonial}
                      className="bg-[#d4af37] hover:bg-[#c9a02e] text-black px-6 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة
                    </button>
                    <button
                      onClick={() => setShowAddTestimonial(false)}
                      className="bg-white/5 hover:bg-white/10 text-gray-400 px-6 py-2.5 rounded-lg font-bold text-sm transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#1a1a1a] border border-[#d4af37]/20 rounded-xl p-5 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex gap-1 mb-2">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                      ))}
                    </div>
                    <p className="text-gray-300">"{t.comment}"</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("حذف هذا التعليق؟")) saveTestimonials(testimonials.filter(x => x.id !== t.id));
                    }}
                    className="shrink-0 bg-red-600/20 hover:bg-red-600/40 text-red-400 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
              {testimonials.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>لا توجد تعليقات</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold text-[#d4af37] mb-6">إدارة التواصل</h2>
            <div className="bg-[#1a1a1a] border border-[#d4af37]/20 rounded-xl p-6 max-w-xl space-y-5">
              <div>
                <label className="block text-gray-400 text-sm mb-2">رقم الهاتف</label>
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-white px-4 py-3 rounded-xl outline-none transition-colors"
                  placeholder="+9647881457896"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">رقم واتساب (بدون +)</label>
                <input
                  type="text"
                  value={contactInfo.whatsapp}
                  onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-white px-4 py-3 rounded-xl outline-none transition-colors"
                  placeholder="9647881457896"
                />
              </div>
              <motion.button
                onClick={saveContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#c9a02e] text-black px-6 py-3 rounded-xl font-bold transition-all"
              >
                <Save className="w-4 h-4" />
                حفظ التغييرات
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
