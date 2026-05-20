import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Activity, 
  Weight, 
  Ruler, 
  Target, 
  Sparkle
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfileSetup = () => {
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(175); // cm
  const [weight, setWeight] = useState(70); // kg
  const [activityLevel, setActivityLevel] = useState('moderately_active');
  const [goal, setGoal] = useState('maintain_weight');

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleComplete = async () => {
    setLoading(true);
    const payload = {
      gender,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      activityLevel,
      goal
    };

    const res = await updateProfile(payload);
    setLoading(false);

    if (res.success) {
      toast.success('Your personalized fitness engine is ready!', {
        icon: '🚀',
        style: {
          background: '#18181b',
          color: '#f4f4f5',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      });
      navigate('/dashboard');
    } else {
      toast.error(res.message);
    }
  };

  const stepsData = [
    { id: 1, label: 'Identity' },
    { id: 2, label: 'Measurements' },
    { id: 3, label: 'Lifestyle' },
    { id: 4, label: 'Fitness Goal' }
  ];

  return (
    <div className="min-h-screen bg-darkbg-950 flex flex-col justify-between p-6 select-none relative overflow-hidden">
      {/* Background Radial Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[45vw] h-[45vw] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[45vw] h-[45vw] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <header className="flex items-center justify-between max-w-2xl mx-auto w-full mb-8 relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 shadow-md shadow-emerald-500/10">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-outfit font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            NutriScan AI
          </span>
        </div>
        <span className="text-zinc-500 text-xs font-semibold">
          Personal Setup Engine
        </span>
      </header>

      {/* Main Form container */}
      <main className="flex-1 flex items-center justify-center relative z-10 py-4">
        <div className="w-full max-w-md glass-card rounded-2xl p-7 shadow-2xl">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-8 px-1">
            {stepsData.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step >= s.id 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                  }`}>
                    {step > s.id ? <Check className="w-4.5 h-4.5" /> : s.id}
                  </div>
                  <span className={`text-[10px] font-semibold mt-1.5 uppercase tracking-wider ${
                    step >= s.id ? 'text-zinc-300' : 'text-zinc-600'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {idx < stepsData.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                    step > s.id ? 'bg-emerald-500' : 'bg-zinc-800'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Steps Content Animations */}
          <div className="min-h-[260px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-outfit font-bold text-xl text-zinc-100">What is your gender?</h2>
                    <p className="text-zinc-500 text-xs mt-1">This optimizes the baseline BMR metabolic calculations.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3.5 pt-2">
                    <button
                      onClick={() => setGender('male')}
                      className={`flex flex-col items-center justify-center py-5 rounded-2xl border font-semibold text-sm transition-all duration-200 ${
                        gender === 'male' 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-glow-emerald' 
                          : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-2xl mb-1.5">👨</span>
                      <span>Male</span>
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`flex flex-col items-center justify-center py-5 rounded-2xl border font-semibold text-sm transition-all duration-200 ${
                        gender === 'female' 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-glow-emerald' 
                          : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-2xl mb-1.5">👩</span>
                      <span>Female</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="font-outfit font-bold text-xl text-zinc-100">Your Measurements</h2>
                    <p className="text-zinc-500 text-xs mt-1">Configure your age, height and weight indices.</p>
                  </div>

                  {/* Age */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                      <span>Age</span>
                      <span className="text-emerald-400 font-bold">{age} yrs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkle className="w-4.5 h-4.5 text-zinc-600" />
                      <input
                        type="range"
                        min="12"
                        max="90"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="flex-1 accent-emerald-500 bg-zinc-800 h-1 rounded-full cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Height */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                      <span>Height</span>
                      <span className="text-emerald-400 font-bold">{height} cm</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ruler className="w-4.5 h-4.5 text-zinc-600" />
                      <input
                        type="range"
                        min="100"
                        max="230"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="flex-1 accent-emerald-500 bg-zinc-800 h-1 rounded-full cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                      <span>Weight</span>
                      <span className="text-emerald-400 font-bold">{weight} kg</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Weight className="w-4.5 h-4.5 text-zinc-600" />
                      <input
                        type="range"
                        min="35"
                        max="180"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="flex-1 accent-emerald-500 bg-zinc-800 h-1 rounded-full cursor-pointer"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="font-outfit font-bold text-xl text-zinc-100">What is your lifestyle?</h2>
                    <p className="text-zinc-500 text-xs mt-1">This factors in your metabolic multiplier.</p>
                  </div>
                  <div className="space-y-2 pt-2">
                    {[
                      { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise, desk job.' },
                      { value: 'lightly_active', label: 'Lightly Active', desc: 'Light exercise or active hobbies 1-3 days/wk.' },
                      { value: 'moderately_active', label: 'Moderately Active', desc: 'Moderate workout or physical duties 3-5 days/wk.' },
                      { value: 'very_active', label: 'Very Active', desc: 'Heavy sports or highly physical worker 6-7 days/wk.' }
                    ].map((act) => (
                      <button
                        key={act.value}
                        onClick={() => setActivityLevel(act.value)}
                        className={`flex items-center gap-3.5 w-full text-left py-2.5 px-4 rounded-xl border text-sm transition-all duration-150 ${
                          activityLevel === act.value
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-glow-emerald'
                            : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
                        }`}
                      >
                        <Activity className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <span className="block font-bold">{act.label}</span>
                          <span className="block text-[11px] text-zinc-500 leading-normal">{act.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="font-outfit font-bold text-xl text-zinc-100">Set your fitness goal</h2>
                    <p className="text-zinc-500 text-xs mt-1">We will generate customized target calories and recommendations.</p>
                  </div>
                  <div className="space-y-2 pt-2">
                    {[
                      { value: 'weight_loss', label: 'Weight Loss', desc: 'Caloric deficit to shed body fat smoothly.', icon: '📉' },
                      { value: 'maintain_weight', label: 'Maintain Weight', desc: 'Perfect caloric balance to retain current stats.', icon: '⚖️' },
                      { value: 'weight_gain', label: 'Weight Gain', desc: 'Caloric surplus to support muscle hyper-growth.', icon: '📈' }
                    ].map((g) => (
                      <button
                        key={g.value}
                        onClick={() => setGoal(g.value)}
                        className={`flex items-center gap-4 w-full text-left py-3 px-4 rounded-xl border text-sm transition-all duration-150 ${
                          goal === g.value
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-glow-emerald'
                            : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
                        }`}
                      >
                        <span className="text-xl">{g.icon}</span>
                        <div>
                          <span className="block font-bold">{g.label}</span>
                          <span className="block text-[11px] text-zinc-500 leading-normal">{g.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-800/80">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg border border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:text-zinc-200 transition-all ${
                step === 1 ? 'opacity-30 pointer-events-none' : ''
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-1.5 text-xs font-semibold py-2 px-4 rounded-lg text-white bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-98 transition-all"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="flex items-center gap-1.5 text-xs font-bold py-2.5 px-5 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-98 transition-all"
              >
                <span>{loading ? 'Calculating...' : 'Build My Engine'}</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* bottom indicator footer */}
      <footer className="text-center text-[10px] text-zinc-600 max-w-2xl mx-auto w-full mt-8 select-none">
        NutriScan AI relies on the standardized Harris-Benedict formulas to evaluate daily metabolic profiles. 
      </footer>
    </div>
  );
};
