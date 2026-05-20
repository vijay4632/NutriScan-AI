import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  Camera, 
  Activity, 
  Flame,
  CheckCircle,
  Database,
  Cpu,
  Clock,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminPanel = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAdminStats = async () => {
    try {
      const res = await axios.get('/api/admin/stats');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Access restricted or server offline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-zinc-500 text-xs">Accessing admin console...</div>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center mx-auto text-rose-500">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="font-outfit font-bold text-lg text-zinc-200">Security Clearance Required</h2>
        <p className="text-xs text-zinc-500 leading-normal">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 select-none">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-outfit font-extrabold text-2xl text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="w-6.5 h-6.5 text-emerald-400" />
            <span>Admin Control Panel</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Audit system metrics, review user accounts, and track vision model metrics.
          </p>
        </div>

        {/* System Online Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-bold">
          <CheckCircle className="w-4 h-4" />
          <span>Health Core Online</span>
        </div>
      </div>

      {/* Numerical Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', val: stats.totalUsers, icon: Users, color: 'text-emerald-400 bg-emerald-500/5' },
          { label: 'Neural Food Scans', val: stats.totalScans, icon: Camera, color: 'text-cyan-400 bg-cyan-500/5' },
          { label: 'Avg Calories Logged', val: `${stats.avgCalories} kcal`, icon: Flame, color: 'text-amber-500 bg-amber-500/5' },
          { label: 'Vision Model Load', val: '94.2%', icon: Cpu, color: 'text-zinc-400 bg-zinc-800/40' }
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-5 flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{card.label}</span>
                <span className="block font-outfit font-extrabold text-2xl text-zinc-200">{card.val}</span>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-800 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Admin Tables Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* User Catalog Directory */}
        <div className="lg:col-span-7 glass-card rounded-2xl overflow-hidden shadow-xl border border-zinc-800/80">
          <div className="p-4 bg-zinc-900/30 border-b border-zinc-800/80 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-zinc-300">Registered Accounts Directory</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800/80 text-zinc-500 uppercase tracking-wider text-[9px] font-bold">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Goal</th>
                  <th className="py-3 px-4 text-center">Weight</th>
                  <th className="py-3 px-4 text-center">Height</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                {stats.users.map((u) => (
                  <tr key={u._id} className="hover:bg-zinc-900/10">
                    <td className="py-3 px-4">
                      <span className="block font-semibold text-zinc-200">{u.name}</span>
                      <span className="block text-[10px] text-zinc-500 font-mono mt-0.5">{u.email}</span>
                    </td>
                    <td className="py-3 px-4 capitalize font-medium text-emerald-400">
                      {u.goal.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4 text-center">{u.weight} kg</td>
                    <td className="py-3 px-4 text-center">{u.height} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Image uploads logs */}
        <div className="lg:col-span-5 glass-card rounded-2xl overflow-hidden shadow-xl border border-zinc-800/80">
          <div className="p-4 bg-zinc-900/30 border-b border-zinc-800/80 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-zinc-300">Recent Food Scans Telemetry</span>
          </div>

          {stats.recentScans.length > 0 ? (
            <div className="divide-y divide-zinc-850">
              {stats.recentScans.map((scan) => (
                <div key={scan._id} className="p-3.5 flex items-center justify-between text-xs hover:bg-zinc-900/10 transition-all duration-150">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-outfit font-bold text-zinc-200">{scan.foodName}</span>
                      <span className="px-1.5 py-0.5 text-[8px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded capitalize">
                        {scan.mealType}
                      </span>
                    </div>
                    <span className="block text-[9px] text-zinc-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(scan.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="block font-outfit font-bold text-zinc-300">{scan.calories} kcal</span>
                    <span className="block text-[8px] text-zinc-500 font-semibold uppercase tracking-wider font-mono">
                      Conf: {Math.round(scan.confidence * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-zinc-600">No scanned items logged in system telemetry.</div>
          )}
        </div>
      </div>
    </div>
  );
};
