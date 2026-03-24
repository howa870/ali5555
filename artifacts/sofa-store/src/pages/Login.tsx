import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAdmin } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAdmin) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const success = login(email, password);
    if (success) {
      navigate("/admin");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="bg-[#d4af37]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#d4af37]/30">
            <Lock className="w-9 h-9 text-[#d4af37]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">تسجيل الدخول</h1>
          <p className="text-gray-400">لوحة تحكم المشرف</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#d4af37]/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d4af37]/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@site.com"
                  className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-white pr-11 pl-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-600"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d4af37]/60" />
                <input
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 focus:border-[#d4af37] text-white pr-11 pl-11 py-3 rounded-xl outline-none transition-colors placeholder-gray-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#d4af37] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#d4af37] hover:bg-[#c9a02e] disabled:opacity-70 text-black font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  دخول
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          <a href="/" className="text-[#d4af37]/70 hover:text-[#d4af37] transition-colors">← العودة للموقع</a>
        </p>
      </motion.div>
    </div>
  );
}
