import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Target, 
  Sparkles, 
  Activity, 
  Sparkle,
  Plus,
  Flame,
  Info,
  BadgeAlert,
  Dumbbell,
  Lightbulb,
  CheckCircle,
  XCircle,
  HelpCircle,
  CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const Recommendations = () => {
  const { user } = useAuth();
  const [generating, setGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);

  const { goal, gender, age, height, weight, activityLevel, targetCalories, bmi } = user || {};

  // Goal descriptive metadata
  const getGoalDescriptive = () => {
    if (goal === 'weight_loss') {
      return {
        title: 'Caloric Deficit & Fat Burn',
        summary: 'Prioritize protein to prevent lean muscle mass atrophy while maintaining deficit thresholds.',
        macros: '40% Protein | 30% Carbs | 30% Fats',
        prioritize: ['Skinless chicken breast, Turkey', 'Wild cod, Atlantic Salmon', 'Spinach, Kale, Broccoli, Cauliflower', 'Egg whites, Greek Yogurt', 'Apples, Blueberries, Raspberries'],
        avoid: ['White sugar, High fructose corn syrups', 'Deep fried fries, potato chips', 'Whole milk dairy cheeses', 'Alcoholic cocktails', 'Refined flour pastas']
      };
    } else if (goal === 'weight_gain') {
      return {
        title: 'Lean Hyper-growth & Mass Gain',
        summary: 'Prioritize calorie-dense whole foods and healthy fats to support muscular repair.',
        macros: '30% Protein | 45% Carbs | 25% Fats',
        prioritize: ['Sirloin steak, Ground beef', 'Avocado, extra virgin olive oils', 'Mixed roasted almonds, walnuts', 'Peanut butter, whole grain oats', 'Sweet potatoes, brown rice'],
        avoid: ['Low-nutrient empty calories', 'Hydrogenated trans-fats', 'Excessive raw caffeine stimulants', 'Carbonated energy sodas', 'Processed micro dinner packets']
      };
    } else {
      return {
        title: 'Metabolic Balance & Maintenance',
        summary: 'Calibrated baseline calorie targets to maintain structural composition indices.',
        macros: '35% Protein | 35% Carbs | 30% Fats',
        prioritize: ['Whole organic eggs', 'Quinoa, brown rice, whole wheat', 'Mixed berries, bananas', 'Baked turkey breasts, tuna', 'Lentils, chickpeas, tofu'],
        avoid: ['Excessive artificial sweets', 'Refined processed oils', 'High-sodium frozen items', 'Trans fat bakeries', 'Sweetened canned drinks']
      };
    }
  };

  const dietDetails = getGoalDescriptive();

  // Simulated AI meal planner generator based on user goal
  const handleGeneratePlan = () => {
    setGenerating(true);
    setMealPlan(null);

    const lostMeals = {
      breakfast: { name: 'Egg White Spinach Omelette', cal: 240, protein: '22g', carbs: '4g', fat: '12g' },
      lunch: { name: 'Chicken Caesar Green Salad', cal: 320, protein: '31g', carbs: '10g', fat: '14g' },
      dinner: { name: 'Baked Atlantic Salmon with Broccoli', cal: 390, protein: '34g', carbs: '12g', fat: '18g' },
      snack: { name: 'Honey Greek Yogurt with Berries', cal: 150, protein: '15g', carbs: '16g', fat: '2g' }
    };

    const gainMeals = {
      breakfast: { name: 'Double Avocado Toast with Poached Eggs', cal: 480, protein: '24g', carbs: '36g', fat: '24g' },
      lunch: { name: 'Spicy Sirloin Steak Bowl with Brown Rice', cal: 620, protein: '42g', carbs: '58g', fat: '22g' },
      dinner: { name: 'Spaghetti Bolognese with Lean Ground Beef', cal: 580, protein: '36g', carbs: '64g', fat: '16g' },
      snack: { name: 'Banana Peanut Butter Whey Shake', cal: 380, protein: '35g', carbs: '42g', fat: '10g' }
    };

    const maintainMeals = {
      breakfast: { name: 'Banana Honey Oatmeal with Walnuts', cal: 320, protein: '10g', carbs: '54g', fat: '8g' },
      lunch: { name: 'Grilled Chicken & Quinoa Salad', cal: 410, protein: '34g', carbs: '38g', fat: '12g' },
      dinner: { name: 'Baked Cod with Roasted Sweet Potato', cal: 430, protein: '32g', carbs: '44g', fat: '10g' },
      snack: { name: 'Handful Mixed Roasted Almonds', cal: 170, protein: '6g', carbs: '6g', fat: '15g' }
    };

    const mealsSource = goal === 'weight_loss' ? lostMeals : goal === 'weight_gain' ? gainMeals : maintainMeals;

    setTimeout(() => {
      setMealPlan(mealsSource);
      setGenerating(false);
      toast.success('Your personalized 1-Day AI meal plan is generated!', {
        icon: '🥗',
        style: {
          background: '#18181b',
          color: '#34d399',
          border: '1px solid rgba(52, 211, 153, 0.2)',
        },
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 select-none">
      <div>
        <h1 className="font-outfit font-extrabold text-2xl text-zinc-100 flex items-center gap-2">
          <Target className="w-6.5 h-6.5 text-emerald-400" />
          <span>Personalized Fitness Engine</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-1">
          Dynamic macro breakdowns, diet tips, and automated AI meal plan calculations.
        </p>
      </div>

      {/* Target Calculations Dashboard Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 shadow-lg border border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4.5 h-4.5 text-emerald-400" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Recommended Calorie Intake</span>
          </div>
          <span className="block font-outfit font-extrabold text-2xl text-emerald-400">{targetCalories} kcal/day</span>
          <span className="block text-[10px] text-zinc-500">Formulated for: {dietDetails.title}</span>
        </div>

        <div className="glass-card rounded-2xl p-5 shadow-lg border border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4.5 h-4.5 text-emerald-400" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Target Macro Ratio</span>
          </div>
          <span className="block font-outfit font-extrabold text-lg text-zinc-200">{dietDetails.macros}</span>
          <span className="block text-[10px] text-zinc-500">{dietDetails.summary}</span>
        </div>

        <div className="glass-card rounded-2xl p-5 shadow-lg border border-zinc-800/80 flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Metabolic Summary</span>
            <span className="block text-xs text-zinc-400 leading-relaxed">
              Gender: <strong className="text-zinc-200 capitalize">{gender}</strong> | Age: <strong className="text-zinc-200">{age}</strong><br />
              BMI Index: <strong className="text-zinc-200">{bmi}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recommended & Avoid Cards List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Priorities list */}
            <div className="glass-card rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 border-b border-zinc-800 pb-2.5">
                <CheckCircle className="w-4.5 h-4.5" />
                <span className="text-xs font-bold uppercase tracking-wider">Foods to Prioritize</span>
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-400 leading-normal">
                {dietDetails.prioritize.map((food, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-emerald-400 font-bold select-none">✓</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid list */}
            <div className="glass-card rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-rose-400 border-b border-zinc-800 pb-2.5">
                <XCircle className="w-4.5 h-4.5" />
                <span className="text-xs font-bold uppercase tracking-wider">Foods to Avoid</span>
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-400 leading-normal">
                {dietDetails.avoid.map((food, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-rose-400 font-bold select-none">✕</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Diet suggestions card */}
          <div className="glass-card rounded-2xl p-5 shadow-lg space-y-3.5">
            <div className="flex items-center gap-2 text-emerald-400">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-outfit font-bold text-sm text-zinc-200">Expert Health Directives</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              To support your active metabolism multiplier (<span className="text-emerald-400 font-bold capitalize">{activityLevel.replace('_', ' ')}</span>), make sure you drink at least <span className="text-emerald-400 font-bold">2.5 to 3 liters of water</span> daily. Maintain protein distributions at roughly <span className="text-emerald-400 font-bold">2g per kilogram of bodyweight</span> to support repair rates during active training cycles. Avoid consuming heavy fat macronutrients within 90 minutes of sleep.
            </p>
          </div>
        </div>

        {/* AI MEAL PLAN PLANNER WIDGET */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-2xl p-5 shadow-2xl space-y-4 border border-zinc-800/80">
            <div>
              <h3 className="font-outfit font-extrabold text-sm text-zinc-200 flex items-center gap-1.5">
                <Sparkles className="w-4.5 h-4.5 text-emerald-400" />
                <span>AI 1-Day Meal Plan Generator</span>
              </h3>
              <p className="text-[10px] text-zinc-500 mt-1 leading-normal">
                Synthesize a custom 1-day structured nutrition catalog matching your calories BMR profile.
              </p>
            </div>

            {!mealPlan && !generating && (
              <button
                onClick={handleGeneratePlan}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 hover:shadow-glow-emerald active:scale-98 transition-all duration-200 animate-pulse"
              >
                <Sparkle className="w-4.5 h-4.5" />
                <span>Generate Customized Meal Plan</span>
              </button>
            )}

            {generating && (
              <div className="text-center py-6 space-y-3.5">
                <div className="relative w-10 h-10 mx-auto">
                  <div className="absolute inset-0 rounded-full border-3 border-emerald-500/10" />
                  <div className="absolute inset-0 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin" />
                </div>
                <span className="block text-[11px] font-mono text-zinc-500 animate-pulse">Running health core synthesis algorithms...</span>
              </div>
            )}

            <AnimatePresence>
              {mealPlan && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Plan Schedule
                    </span>
                    <button
                      onClick={handleGeneratePlan}
                      className="text-[10px] font-bold text-emerald-400 hover:underline"
                    >
                      Regenerate
                    </button>
                  </div>

                  {/* Meal list */}
                  <div className="space-y-2.5">
                    {[
                      { key: 'Breakfast', icon: '🍳', data: mealPlan.breakfast },
                      { key: 'Lunch', icon: '🥗', data: mealPlan.lunch },
                      { key: 'Dinner', icon: '🥩', data: mealPlan.dinner },
                      { key: 'Snack', icon: '🥛', data: mealPlan.snack }
                    ].map((m) => (
                      <div key={m.key} className="p-3 bg-zinc-950 rounded-xl border border-zinc-850 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base select-none">{m.icon}</span>
                          <div>
                            <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">{m.key}</span>
                            <span className="block font-outfit font-extrabold text-xs text-zinc-200">{m.data.name}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="block font-outfit font-bold text-xs text-emerald-400">{m.data.cal} kcal</span>
                          <span className="block text-[8px] text-zinc-500 font-semibold font-mono">
                            P:{m.data.protein} | C:{m.data.carbs}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
