import { motion, AnimatePresence } from "motion/react";
import { X, Settings, Image, MessageSquare, RotateCcw, Save } from "lucide-react";

interface Testimonial {
  id: number;
  rating: number;
  comment: string;
  image: string;
}

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  settings: { title: string; subtitle: string; button: string };
  onSettingsChange: (s: { title: string; subtitle: string; button: string }) => void;
  galleryImages: string[];
  testimonials: Testimonial[];
  onSaveSettings: () => void;
  onResetGallery: () => void;
  onDeleteTestimonial: (id: number) => void;
}

export function AdminPanel({
  open,
  onClose,
  settings,
  onSettingsChange,
  galleryImages,
  testimonials,
  onSaveSettings,
  onResetGallery,
  onDeleteTestimonial,
}: AdminPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#d4af37]/20 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-[#d4af37]" />
                <h2 className="text-xl font-bold text-[#d4af37]">لوحة التحكم</h2>
              </div>
              <button onClick={onClose} className="bg-[#d4af37] hover:bg-[#c9a02e] text-black p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Settings Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-[#d4af37]" />
                  <h3 className="text-lg font-bold text-white">إعدادات العنوان</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">العنوان الرئيسي</label>
                    <input
                      value={settings.title}
                      onChange={(e) => onSettingsChange({ ...settings, title: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 p-3 rounded-lg text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">العنوان الفرعي</label>
                    <input
                      value={settings.subtitle}
                      onChange={(e) => onSettingsChange({ ...settings, subtitle: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 p-3 rounded-lg text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">نص الزر</label>
                    <input
                      value={settings.button}
                      onChange={(e) => onSettingsChange({ ...settings, button: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 p-3 rounded-lg text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>
                  <motion.button
                    onClick={onSaveSettings}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#c9a02e] text-black px-6 py-2 rounded-lg font-bold transition-all duration-300"
                  >
                    <Save className="w-4 h-4" />
                    حفظ الإعدادات
                  </motion.button>
                </div>
              </section>

              {/* Gallery Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Image className="w-5 h-5 text-[#d4af37]" />
                    <h3 className="text-lg font-bold text-white">صور المعرض ({galleryImages.length})</h3>
                  </div>
                  <motion.button
                    onClick={onResetGallery}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1 rounded-lg text-sm transition-all duration-300"
                  >
                    <RotateCcw className="w-3 h-3" />
                    إعادة تعيين
                  </motion.button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden border border-[#d4af37]/20">
                      <img src={img} alt={`صورة ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Testimonials Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-[#d4af37]" />
                  <h3 className="text-lg font-bold text-white">التعليقات ({testimonials.length})</h3>
                </div>
                <div className="space-y-3">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-[#0a0a0a] border border-[#d4af37]/10 p-4 rounded-lg flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-300 text-sm truncate">"{t.comment}"</p>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <span key={i} className="text-[#d4af37] text-xs">★</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm("هل تريد حذف هذا التعليق؟")) onDeleteTestimonial(t.id);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg text-xs transition-all duration-300 shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {testimonials.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">لا توجد تعليقات</p>
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
