import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminLoginModal = ({ isOpen, onClose }) => {
  const { loginAdmin, showToast } = useStore();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = loginAdmin(user.trim(), pass);
      setLoading(false);
      if (ok) {
        showToast('✓ Sesión iniciada — Modo Edición activo');
        setUser(''); setPass('');
        onClose();
      } else {
        setError('Credenciales incorrectas. Verifica usuario y contraseña.');
      }
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-sm rounded-2xl bg-[#0A0D0C] border border-[#107C41]/60 shadow-[0_30px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(0,168,89,0.2)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-[#062618]/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#107C41] border border-[#00FF88] flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-grotesk font-bold text-sm text-white">ACCESO ADMINISTRADOR</h3>
                  <span className="text-[10px] font-mono text-[#00FF88]">GEORGE VARIEDADES // MODO EDICIÓN</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-[11px] font-mono text-[#94A3B8] block mb-1.5">USUARIO</label>
                <input
                  type="text"
                  autoComplete="username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  placeholder="admin_george"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-600 focus:border-[#00FF88] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#94A3B8] block mb-1.5">CONTRASEÑA</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 pr-11 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-600 focus:border-[#00FF88] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#107C41] to-[#00A859] hover:from-[#00A859] hover:to-[#00FF88] text-white font-montserrat font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <span className="animate-pulse">Verificando...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Iniciar Sesión</span>
                  </>
                )}
              </button>

              <p className="text-center text-[10px] font-mono text-slate-600">
                Acceso restringido al equipo GEORGE VARIEDADES
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
