import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "wouter";
import { X, ArrowRight, Upload, Trash2, Plus } from "lucide-react";
import { ScrollToTop } from "../components/ScrollToTop";
import { LoadingSpinner } from "../components/LoadingSpinner";

const defaultImages = [
  "https://images.unsplash.com/photo-1762803842055-de1e5fb14477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBzb2ZhJTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzc0MTYzNDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1683793837504-318275ff665d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwdmVsdmV0JTIwY291Y2glMjBnb2xkfGVufDF8fHx8MTc3NDE2MzQ3OXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1707299231603-6c0a93e0f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGl2aW5nJTIwcm9vbSUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NzQxMjkwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzb2ZhJTIwc2hvd3Jvb218ZW58MXx8fHwxNzQyNTg0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbiUyMHNvZmF8ZW58MXx8fHwxNzc0MTYzNDgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2ZhJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzQxMjkwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
];

export default function Gallery() {
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const [images, setImages] = useState<string[]>(defaultImages);
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("galleryImages");
    if (saved) setImages(JSON.parse(saved));
  }, []);

  const saveImages = (imgs: string[]) => {
    setImages(imgs);
    localStorage.setItem("galleryImages", JSON.stringify(imgs));
  };

  const handleUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        saveImages(newImages);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (index: number) => {
    if (confirm("هل تريد حذف هذه الصورة؟")) {
      const newImages = images.filter((_, i) => i !== index);
      saveImages(newImages);
    }
  };

  const addNewImage = () => {
    const newImages = [...images, defaultImages[0]];
    saveImages(newImages);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">
      {isLoading && <LoadingSpinner />}
      <ScrollToTop />

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/">
              <button className="flex items-center gap-2 text-[#d4af37] hover:text-[#c9a02e] transition-colors mb-8">
                <ArrowRight className="w-5 h-5" />
                <span>العودة للرئيسية</span>
              </button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">معرض <span className="text-[#d4af37]">أعمالنا</span></h1>
            <div className="w-24 h-1 bg-[#d4af37] mb-6"></div>
            <p className="text-xl text-gray-300">جميع أعمالنا المميزة في مكان واحد</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] border-2 border-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300"
              >
                <img
                  src={image}
                  alt={`عمل ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                  onClick={() => setSelected(image)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {isAdmin && (
                  <>
                    <div className="absolute bottom-4 right-4 z-10">
                      <label className="cursor-pointer bg-[#d4af37] hover:bg-[#c9a02e] text-black px-3 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-xl">
                        <Upload className="w-4 h-4" />
                        <span>تحديث</span>
                        <input type="file" accept="image/*" onChange={(e) => handleUpload(index, e)} className="hidden" />
                      </label>
                    </div>
                    <div className="absolute bottom-4 left-4 z-10">
                      <button
                        onClick={() => deleteImage(index)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
                <div className="absolute top-4 right-4 bg-[#d4af37] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
              </motion.div>
            ))}

            {isAdmin && (
              <motion.button
                onClick={addNewImage}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="aspect-[4/3] rounded-xl border-2 border-dashed border-[#d4af37]/40 hover:border-[#d4af37] flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:bg-[#d4af37]/5"
              >
                <Plus className="w-10 h-10 text-[#d4af37]" />
                <span className="text-[#d4af37] font-bold">إضافة صورة جديدة</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-50 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-3 rounded-full">
            <X className="w-6 h-6" />
          </button>
          <img
            src={selected}
            alt="عمل مميز"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
