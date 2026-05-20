import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Camera, 
  History, 
  BarChart3, 
  Target, 
  Settings, 
  ShieldCheck, 
  LogOut,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Scanner', path: '/scanner', icon: Camera, highlight: true },
    { name: 'Meal History', path: '/history', icon: History },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Recommendations', path: '/recommendations', icon: Target },
    { name: 'Profile Settings', path: '/profile', icon: Settings },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: ShieldCheck });
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-darkbg-950 border-r border-zinc-800/60 p-5 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 py-4 px-2 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
          <Sparkles className="w-5.5 h-5.5 text-white" />
        </div>
        <div>
          <span className="font-outfit font-bold text-lg bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            NutriScan AI
          </span>
          <span className="block text-[10px] text-zinc-500 tracking-widest uppercase font-semibold">
            Health Core
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => toggleSidebar && toggleSidebar(false)}
              className={({ isActive }) => `
                relative flex items-center gap-3.5 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? 'text-white' 
                  : item.highlight 
                    ? 'text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-glow"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-600/5 border-l-3 border-emerald-500 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              
              <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                isActive ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-zinc-300'
              }`} />
              
              <span className="relative z-10">{item.name}</span>

              {item.highlight && !isActive && (
                <span className="absolute right-3.5 px-2 py-0.5 text-[9px] font-bold tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full animate-pulse uppercase">
                  Scanner
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Session Footer */}
      <div className="border-t border-zinc-800/80 pt-4 mt-4 px-2 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800 overflow-hidden flex-shrink-0">
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-zinc-700 to-zinc-800 font-bold font-outfit text-zinc-300 text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <span className="block text-sm font-semibold text-zinc-200 truncate font-outfit">
              {user?.name || 'NutriScan User'}
            </span>
            <span className="block text-xs text-zinc-500 truncate">
              {user?.email || 'user@example.com'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 hover:border-rose-500/20 active:scale-98 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen fixed top-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => toggleSidebar(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            {/* Side Sheet */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 w-64 z-50 shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
