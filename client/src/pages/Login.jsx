import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      toast.success('Welcome back to NutriScan AI!', {
        style: {
          background: '#18181b',
          color: '#f4f4f5',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      });
      navigate('/dashboard');
    } else {
      setError(res.message);
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkbg-950 px-4 relative overflow-hidden select-none">
      {/* Background Radial Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo Card Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/25 mb-4">
            <Sparkles className="w-6.5 h-6.5 text-white" />
          </div>
          <h1 className="font-outfit font-extrabold text-2xl text-zinc-100">
            Sign In to NutriScan AI
          </h1>
          <p className="text-zinc-500 text-sm mt-1.5">
            Optimize your calorie tracking and lifestyle engine.
          </p>
        </div>

        {/* Auth Panel */}
        <div className="glass-card rounded-2xl p-7 shadow-2xl relative">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3.5 mb-5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full glass-input rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 font-sans"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Password
                </label>
                <Link to="#" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full glass-input rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3 mt-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/15 active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
            >
              <span>{loading ? 'Logging you in...' : 'Access Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Admin Account Injector */}
          <div className="mt-5 pt-5 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Need diagnostic access?</span>
            <button
              onClick={() => {
                setEmail('admin@nutriscan.ai');
                setPassword('admin123');
                toast.success('Admin credentials pre-filled!', { icon: '🔑' });
              }}
              className="text-emerald-400 hover:underline font-semibold"
            >
              Autofill Admin
            </button>
          </div>
        </div>

        {/* Footer Redirect */}
        <p className="text-center text-zinc-500 text-xs mt-6 select-none">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline">
            Register for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
