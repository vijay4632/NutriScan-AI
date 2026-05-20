import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, BarChart3, Target, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
  return (
    <div className="min-h-screen bg-darkbg-950 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Background Radial Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-teal-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Landing Navbar */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-outfit font-extrabold text-base tracking-wide bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            NutriScan AI
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 hover:shadow-glow-emerald px-4 py-2 rounded-xl transition-all"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Hero Copy */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center relative z-10 space-y-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 max-w-3xl"
        >
          <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-emerald-500/10 text-[10px] text-emerald-400 border border-emerald-500/20 font-extrabold uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 animate-pulse" />
            <span>AI-Driven Calorie Diagnostics</span>
          </div>

          <h1 className="font-outfit font-extrabold text-4xl sm:text-6xl text-zinc-100 leading-tight">
            Track Nutrition at the Speed of{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Computer Vision
            </span>
          </h1>

          <p className="text-zinc-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            NutriScan AI translates photos of food into instant macro indices, vitamin stats, and structured logs. Set BMR limits and access goal-calibrated recommendations instantly.
          </p>
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4"
        >
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 py-4 px-8 rounded-2xl text-xs font-extrabold text-black bg-emerald-400 hover:bg-emerald-300 hover:shadow-glow-emerald active:scale-98 transition-all"
          >
            <span>Initialize My Fitness Engine</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 py-4 px-8 rounded-2xl text-xs font-semibold text-zinc-400 hover:text-zinc-200 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 active:scale-98 transition-all"
          >
            <span>Audit Admin Console</span>
          </Link>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full pt-10"
        >
          {[
            { 
              title: 'Neural Vision Scanner', 
              desc: 'Point your camera or upload photo to instantly classify food with confidence tags.', 
              icon: Camera 
            },
            { 
              title: 'Smart Calorie Diary', 
              desc: 'Keep track of calorie quotas, remaining limits, and water intake widgets.', 
              icon: BarChart3 
            },
            { 
              title: 'Personal BMR calculations', 
              desc: 'Recalculated BMR & BMI scales relying on Harris-Benedict formulas configurations.', 
              icon: Target 
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-card rounded-2xl p-5 text-left space-y-3.5 border border-zinc-850">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-outfit font-extrabold text-sm text-zinc-200">{item.title}</h3>
                  <p className="text-[11px] text-zinc-500 mt-1.5 leading-normal">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </main>

      {/* Footer copyright */}
      <footer className="text-center py-6 text-[10px] text-zinc-600 relative z-10 border-t border-zinc-900/60 mt-10">
        © {new Date().getFullYear()} NutriScan AI. Powered by advanced agentic visual metrics networks.
      </footer>
    </div>
  );
};
