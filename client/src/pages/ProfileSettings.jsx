import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Settings, 
  User, 
  Weight, 
  Ruler, 
  Activity, 
  Target, 
  Calendar, 
  Check, 
  AlertCircle,
  Camera
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState(user?.name || '');
  const [gender, setGender] = useState(user?.gender || 'male');
  const [age, setAge] = useState(user?.age || 25);
  const [height, setHeight] = useState(user?.height || 175);
  const [weight, setWeight] = useState(user?.weight || 70);
  const [activityLevel, setActivityLevel] = useState(user?.activityLevel || 'moderately_active');
  const [goal, setGoal] = useState(user?.goal || 'maintain_weight');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      gender,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      activityLevel,
      goal,
      profilePhoto
    };

    const res = await updateProfile(payload);
    setLoading(false);

    if (res.success) {
      toast.success('Your metabolic profiles are recalculated and saved!', {
        icon: '💾',
        style: {
          background: '#18181b',
          color: '#34d399',
          border: '1px solid rgba(52, 211, 153, 0.2)',
        },
      });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 select-none">
      <div>
        <h1 className="font-outfit font-extrabold text-2xl text-zinc-100 flex items-center gap-2">
          <Settings className="w-6.5 h-6.5 text-emerald-400" />
          <span>Profile Settings</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-1">
          Review metrics, update physical scales, and track calorie limit adjustments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Profile Info Badge */}
        <div className="glass-card rounded-2xl p-5 shadow-xl text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto rounded-full border border-zinc-700 bg-zinc-800 overflow-hidden group">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-zinc-700 to-zinc-800 font-bold font-outfit text-zinc-300 text-3xl">
                {name ? name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all duration-200">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>

          <div>
            <h3 className="font-outfit font-extrabold text-base text-zinc-200">{name}</h3>
            <span className="text-[10px] text-zinc-500 font-medium font-mono">{user?.email}</span>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-900">
              <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">BMI</span>
              <span className="block font-outfit font-extrabold text-sm text-zinc-200">{user?.bmi || 'N/A'}</span>
            </div>
            <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-900">
              <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Daily Target</span>
              <span className="block font-outfit font-extrabold text-sm text-emerald-400">{user?.targetCalories || 'N/A'} kcal</span>
            </div>
          </div>
        </div>

        {/* Form settings */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-input rounded-xl py-2 pl-9 pr-4 text-xs text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full glass-input rounded-xl py-2 px-4 text-xs text-zinc-300 font-semibold focus:outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Age (years)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full glass-input rounded-xl py-2 pl-9 pr-4 text-xs text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Height (cm)</label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full glass-input rounded-xl py-2 pl-9 pr-4 text-xs text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Weight (kg)</label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full glass-input rounded-xl py-2 pl-9 pr-4 text-xs text-zinc-100"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full glass-input rounded-xl py-2 px-4 text-xs text-zinc-300 font-semibold focus:outline-none"
                >
                  <option value="sedentary">Sedentary (Little/no exercise)</option>
                  <option value="lightly_active">Lightly Active (1-3 days/wk)</option>
                  <option value="moderately_active">Moderately Active (3-5 days/wk)</option>
                  <option value="very_active">Very Active (6-7 days/wk)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Fitness Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full glass-input rounded-xl py-2 px-4 text-xs text-zinc-300 font-semibold focus:outline-none"
                >
                  <option value="weight_loss">Weight Loss (Deficit)</option>
                  <option value="maintain_weight">Maintain Weight (Balance)</option>
                  <option value="weight_gain">Weight Gain (Surplus)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1.5 py-2.5 px-6 rounded-xl text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 hover:shadow-glow-emerald active:scale-98 disabled:opacity-40 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>{loading ? 'Recalculating...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
