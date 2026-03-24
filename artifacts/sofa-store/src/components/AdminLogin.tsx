import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock } from "lucide-react";

interface AdminLoginProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSWORD = "admin2024";

export function AdminLogin({ open, onClose, onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("isAdmin", "true");
      setPassword("");
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#1a1a1a] border border-[#d4af37]/30 p-8 rounded-xl shadow-2xl w-full max-w-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-2 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center mb-6">
              <div className="bg-[#d4af37]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-bold text-[#d4af37]">تسجيل الدخول</h3>
              <p className="text-gray-400 text-sm mt-1">أدخل كلمة المرور للوصول للوحة التحكم</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className={`w-full bg-[#0a0a0a] border ${error ? "border-red-500" : "border-[#d4af37]/20"} p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors`}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm text-center">كلمة المرور غير صحيحة</p>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#d4af37] hover:bg-[#c9a02e] text-black py-3 rounded-lg font-bold transition-all duration-300"
              >
                دخول
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
