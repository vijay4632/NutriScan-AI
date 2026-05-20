import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  History, 
  Search, 
  Trash2, 
  Flame, 
  Utensils, 
  Sparkle,
  Calendar,
  Sparkles,
  SearchCode,
  FolderMinus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const MealHistory = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const fetchMealHistory = async () => {
    try {
      const res = await axios.get('/api/meals/history');
      if (res.data.success) {
        setMeals(res.data.data);
        setFilteredMeals(res.data.data);
      }
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealHistory();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = meals;

    if (search) {
      result = result.filter(m => m.foodName.toLowerCase().includes(search.toLowerCase()));
    }

    if (category !== 'all') {
      result = result.filter(m => m.mealType === category);
    }

    setFilteredMeals(result);
  }, [search, category, meals]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from your diary?`)) return;

    try {
      const res = await axios.delete(`/api/meals/${id}`);
      if (res.data.success) {
        setMeals(prev => prev.filter(m => m._id !== id));
        toast.success(`Removed "${name}" from diary.`, {
          style: { background: '#18181b', color: '#f4f4f5' }
        });
      }
    } catch (err) {
      toast.error('Failed to delete meal entry.');
    }
  };

  // Group foods to find "Favorites" (Most frequently logged)
  const getFavoriteFoods = () => {
    const counts = {};
    meals.forEach(m => {
      counts[m.foodName] = (counts[m.foodName] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => {
        const matchingMeal = meals.find(m => m.foodName === name);
        return {
          name,
          count,
          calories: matchingMeal?.calories || 0,
          protein: matchingMeal?.protein || 0,
          carbs: matchingMeal?.carbs || 0,
          fats: matchingMeal?.fats || 0,
          imageUrl: matchingMeal?.imageUrl
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5
  };

  const favorites = getFavoriteFoods();

  // Accumulate totals for filtered view
  const totals = filteredMeals.reduce(
    (acc, m) => {
      acc.calories += m.calories || 0;
      acc.protein += m.protein || 0;
      acc.carbs += m.carbs || 0;
      acc.fats += m.fats || 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 select-none">
      <div>
        <h1 className="font-outfit font-extrabold text-2xl text-zinc-100 flex items-center gap-2">
          <History className="w-6.5 h-6.5 text-emerald-400" />
          <span>Meal History & Logs</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-1">
          Review, filter, search, and analyze your historic health diary records.
        </p>
      </div>

      {/* TOP FAVORITES CAROUSEL WIDGET */}
      {favorites.length > 0 && (
        <div className="space-y-3">
          <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Frequently Scanned Foods</span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            {favorites.map((fav) => (
              <div key={fav.name} className="glass-card rounded-xl p-3.5 border border-zinc-800/80 space-y-2 relative overflow-hidden flex flex-col justify-between">
                <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[8px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  Logged {fav.count}x
                </span>
                <div className="space-y-1.5 pt-2">
                  <span className="block font-outfit font-extrabold text-xs text-zinc-200 truncate">{fav.name}</span>
                  <span className="block text-[10px] text-zinc-500">{fav.calories} kcal | {Math.round(fav.protein)}g Protein</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
        {/* Search */}
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search catalog by food name..."
            className="w-full glass-input rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-100 placeholder-zinc-700"
          />
        </div>

        {/* Category select */}
        <div className="md:col-span-4 select-none">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full glass-input rounded-xl py-2.5 px-4 text-xs text-zinc-300 font-semibold focus:outline-none focus:border-emerald-500"
          >
            <option value="all" className="bg-zinc-950 text-zinc-300">All Meal Types</option>
            <option value="breakfast" className="bg-zinc-950 text-zinc-300">Breakfast</option>
            <option value="lunch" className="bg-zinc-950 text-zinc-300">Lunch</option>
            <option value="dinner" className="bg-zinc-950 text-zinc-300">Dinner</option>
            <option value="snack" className="bg-zinc-950 text-zinc-300">Snack</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-500 text-xs">Loading logs history...</div>
      ) : filteredMeals.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Logs Table */}
          <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden shadow-xl border border-zinc-800/80">
            <div className="p-4 bg-zinc-900/30 border-b border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300">Diary entries count: {filteredMeals.length}</span>
            </div>

            <div className="divide-y divide-zinc-800/50">
              <AnimatePresence>
                {filteredMeals.map((meal) => (
                  <motion.div
                    key={meal._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between p-4 group hover:bg-zinc-900/20 transition-all duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-850">
                        <Utensils className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-outfit font-extrabold text-sm text-zinc-200">{meal.foodName}</span>
                          <span className="px-1.5 py-0.5 text-[8px] font-bold text-zinc-500 bg-zinc-800 rounded capitalize">
                            {meal.mealType}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[10px] text-zinc-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(meal.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                          <span>Portion: {meal.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block font-outfit font-bold text-sm text-zinc-200">{meal.calories} kcal</span>
                        <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">
                          P: {Math.round(meal.protein)}g | C: {Math.round(meal.carbs)}g | F: {Math.round(meal.fats)}g
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(meal._id, meal.foodName)}
                        className="p-2 rounded-lg text-rose-500/10 group-hover:text-rose-400 hover:bg-rose-500/10 hover:border hover:border-rose-500/20 transition-all duration-200"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Aggregates Panel */}
          <div className="glass-card rounded-2xl p-5 shadow-xl border border-zinc-800/80 space-y-4">
            <div>
              <h3 className="font-outfit font-extrabold text-sm text-zinc-300">Filtered Diary Accumulations</h3>
              <span className="text-[10px] text-zinc-500">Totals calculated across all visible logged entries.</span>
            </div>

            <div className="space-y-3.5">
              {/* Calories total */}
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4.5 h-4.5 text-emerald-400" />
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Total energy logged</span>
                </div>
                <span className="font-outfit font-extrabold text-sm text-emerald-400">{Math.round(totals.calories)} kcal</span>
              </div>

              {/* Macros breakdown bars */}
              <div className="space-y-3 pt-2">
                {[
                  { name: 'Protein (Target: ~140g)', val: totals.protein, color: 'bg-emerald-400' },
                  { name: 'Carbs (Target: ~220g)', val: totals.carbs, color: 'bg-cyan-400' },
                  { name: 'Fats (Target: ~60g)', val: totals.fats, color: 'bg-amber-400' }
                ].map((macro) => (
                  <div key={macro.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400">
                      <span>{macro.name}</span>
                      <span className="text-zinc-200 font-bold">{Math.round(macro.val)}g</span>
                    </div>
                    <div className="bg-zinc-900/60 h-1.5 rounded-full overflow-hidden border border-zinc-800/20">
                      <div className={`${macro.color} h-full`} style={{ width: `${Math.min((macro.val / 150) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center text-zinc-500 shadow-xl flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
            <SearchCode className="w-5.5 h-5.5 text-zinc-600" />
          </div>
          <h3 className="font-outfit font-bold text-sm text-zinc-400">No logs match your filter queries</h3>
          <p className="text-[11px] text-zinc-600 max-w-xs mt-1 leading-normal">
            Try adjusting search keys, selecting another meal category, or logging a brand new meal using the scanner!
          </p>
        </div>
      )}
    </div>
  );
};
