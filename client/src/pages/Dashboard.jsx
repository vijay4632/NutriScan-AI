import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Flame, 
  Droplet, 
  Scale, 
  TrendingUp, 
  Camera, 
  Plus, 
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [waterCups, setWaterCups] = useState(0);

  // Load water tracker from local storage to keep state persistent locally
  useEffect(() => {
    const savedWater = localStorage.getItem(`water_${user?._id}_${new Date().toDateString()}`);
    if (savedWater) {
      setWaterCups(Number(savedWater));
    }
  }, [user]);

  const incrementWater = () => {
    const newVal = waterCups + 1;
    setWaterCups(newVal);
    localStorage.setItem(`water_${user?._id}_${new Date().toDateString()}`, newVal);
    toast.success('Water logged! Stay hydrated. 💧', {
      style: { background: '#18181b', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.2)' }
    });
  };

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('/api/user/dashboard');
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-darkbg-950 text-zinc-400 select-none">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/10" />
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
        </div>
        <span className="text-sm font-semibold tracking-wider font-outfit animate-pulse">Running health core telemetry...</span>
      </div>
    );
  }

  const { targetCalories, goal, weight, bmi, name } = data?.user || user || {};
  const consumed = data?.todayConsumption?.calories || 0;
  const remaining = Math.max(targetCalories - consumed, 0);
  const percentConsumed = Math.min(Math.round((consumed / targetCalories) * 100), 100);

  // Micro macros
  const protein = data?.todayConsumption?.protein || 0;
  const carbs = data?.todayConsumption?.carbs || 0;
  const fats = data?.todayConsumption?.fats || 0;

  // Pie chart macro splits
  const pieData = [
    { name: 'Protein', value: protein || 1, color: '#10b981' }, // emerald
    { name: 'Carbs', value: carbs || 1, color: '#06b6d4' },    // cyan
    { name: 'Fats', value: fats || 1, color: '#f59e0b' }       // amber
  ];

  // Simulated static history for Area chart calorie trend
  const weeklyTrends = [
    { day: 'Mon', calories: Math.round(targetCalories * 0.9) },
    { day: 'Tue', calories: Math.round(targetCalories * 1.05) },
    { day: 'Wed', calories: Math.round(targetCalories * 0.85) },
    { day: 'Thu', calories: Math.round(targetCalories * 1.1) },
    { day: 'Fri', calories: Math.round(targetCalories * 0.95) },
    { day: 'Sat', calories: Math.round(targetCalories * 0.75) },
    { day: 'Sun', calories: consumed }
  ];

  // BMI status evaluation
  let bmiCategory = 'Normal';
  let bmiColor = 'text-emerald-400';
  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-amber-400';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-400';
  } else if (bmi >= 30) {
    bmiCategory = 'Obese';
    bmiColor = 'text-rose-400';
  }

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getGoalLabel = (g) => {
    if (g === 'weight_loss') return 'Weight Loss';
    if (g === 'weight_gain') return 'Weight Gain';
    return 'Maintain Weight';
  };

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto pb-10">
      {/* Welcome Hero Grid Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800/80 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-[30%] h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-500/10 text-[10px] text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Health Telemetry</span>
            </div>
            <h1 className="font-outfit font-extrabold text-2xl md:text-3xl text-zinc-100 leading-tight">
              {getGreeting()}, <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">{name}</span>
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm max-w-xl leading-normal">
              Your metabolism is operating at peak levels today. You've logged <span className="text-emerald-400 font-bold">{data?.todayMealsCount || 0} meals</span> and consumed <span className="text-emerald-400 font-bold">{percentConsumed}%</span> of your daily target.
            </p>
          </div>
          
          <Link
            to="/scanner"
            className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/15 active:scale-98 transition-all duration-200"
          >
            <Camera className="w-4.5 h-4.5" />
            <span>AI Food Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Summary cards grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calorie Card */}
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">Consumed today</span>
            <div className="flex items-baseline gap-1">
              <span className="font-outfit font-extrabold text-2xl text-emerald-400">{consumed}</span>
              <span className="text-xs text-zinc-500 font-medium">/ {targetCalories} kcal</span>
            </div>
            <div className="w-36 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full" style={{ width: `${percentConsumed}%` }} />
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        {/* Calorie Remaining */}
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">Calories remaining</span>
            <span className="block font-outfit font-extrabold text-2xl text-zinc-100">{remaining} kcal</span>
            <span className="block text-[10px] text-zinc-500 font-medium leading-none">Goal: {getGoalLabel(goal)}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-teal-400" />
          </div>
        </div>

        {/* Water Tracker */}
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">Water logger</span>
            <span className="block font-outfit font-extrabold text-2xl text-cyan-400">{waterCups * 250} ml</span>
            <button
              onClick={incrementWater}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full hover:bg-cyan-400/20 transition-all duration-150"
            >
              <Plus className="w-3 h-3" />
              <span>Log +250ml</span>
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Droplet className="w-6 h-6 text-cyan-400" />
          </div>
        </div>

        {/* BMI & Weight Card */}
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">BMI metrics</span>
            <span className="block font-outfit font-extrabold text-2xl text-zinc-100">{bmi || 22.5}</span>
            <span className={`block text-[10px] font-bold ${bmiColor} uppercase tracking-wider`}>
              {bmiCategory} ({weight} kg)
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/80 flex items-center justify-center">
            <Scale className="w-6 h-6 text-zinc-400" />
          </div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Trend Chart */}
        <div className="glass-card rounded-2xl p-5 lg:col-span-2 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-outfit font-bold text-lg text-zinc-100">Weekly Calorie Velocity</h2>
              <span className="text-xs text-zinc-500">Track calorie consumption metrics vs goals.</span>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-1 px-3 rounded-full uppercase tracking-wider">
              Stabilized
            </span>
          </div>

          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrends} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '12px' }}
                  labelStyle={{ color: '#a1a1aa', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Macro Composition Pie Chart */}
        <div className="glass-card rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="font-outfit font-bold text-lg text-zinc-100">Macro Distribution</h2>
            <span className="text-xs text-zinc-500">Nutrient grams balance logs.</span>
          </div>

          <div className="h-[160px] w-full flex items-center justify-center relative my-2">
            {protein || carbs || fats ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <span className="text-xs text-zinc-500">No data logged yet today.</span>
            )}
            
            {/* Center Label */}
            <div className="absolute flex flex-col items-center">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Macros</span>
              <span className="font-outfit font-extrabold text-sm text-zinc-200">
                {Math.round(protein + carbs + fats)}g
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-zinc-800/80 text-center">
            <div>
              <span className="block text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Protein</span>
              <span className="block font-outfit font-bold text-sm text-zinc-200">{protein}g</span>
            </div>
            <div>
              <span className="block text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">Carbs</span>
              <span className="block font-outfit font-bold text-sm text-zinc-200">{carbs}g</span>
            </div>
            <div>
              <span className="block text-[10px] font-semibold text-amber-500 uppercase tracking-wider">Fats</span>
              <span className="block font-outfit font-bold text-sm text-zinc-200">{fats}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
