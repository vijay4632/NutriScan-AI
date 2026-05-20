import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Menu } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Page Imports
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProfileSetup } from './pages/ProfileSetup';
import { Dashboard } from './pages/Dashboard';
import { Scanner } from './pages/Scanner';
import { MealHistory } from './pages/MealHistory';
import { Analytics } from './pages/Analytics';
import { Recommendations } from './pages/Recommendations';
import { ProfileSettings } from './pages/ProfileSettings';
import { AdminPanel } from './pages/AdminPanel';

// Protected Route Wrap Utility
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-darkbg-950 flex flex-col items-center justify-center text-zinc-500 text-xs">
        <div className="w-10 h-10 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <span>Authenticating session logs...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin Route Wrap Utility
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // If user is on setup wizard, don't show standard navigation sidebar
  if (location.pathname === '/setup') {
    return (
      <div className="min-h-screen bg-darkbg-950">
        <Routes>
          <Route path="/setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkbg-950 flex">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={mobileSidebarOpen} toggleSidebar={setMobileSidebarOpen} />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Mobile Header Bar */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950 select-none z-20">
          <div className="flex items-center gap-2">
            <span className="font-outfit font-black text-sm bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              NutriScan AI
            </span>
          </div>
          
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 active:scale-95 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Content Workspace */}
        <main className="flex-1 p-6 overflow-y-auto z-10 relative">
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/scanner" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><MealHistory /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminRoute><AdminPanel /></AdminRoute></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Landing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Dashboard routes layout wrapping */}
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </AuthProvider>
  );
};
