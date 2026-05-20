export const localFoodDb = {
  pizza: {
    foodName: 'Pepperoni Pizza',
    calories: 290,
    protein: 12.2,
    carbs: 32.5,
    fats: 12.1,
    fiber: 1.5,
    sugar: 3.2,
    vitamins: { 'Vitamin A': '6%', 'Vitamin C': '2%', 'Calcium': '15%' },
    minerals: { 'Iron': '10%', 'Sodium': '640mg', 'Potassium': '140mg' },
    quantity: '1 slice (107g)',
    confidence: 0.94
  },
  burger: {
    foodName: 'Double Cheeseburger',
    calories: 450,
    protein: 25.4,
    carbs: 34.0,
    fats: 22.8,
    fiber: 2.0,
    sugar: 6.0,
    vitamins: { 'Vitamin A': '8%', 'Vitamin C': '1%', 'Calcium': '20%' },
    minerals: { 'Iron': '20%', 'Sodium': '980mg', 'Potassium': '380mg' },
    quantity: '1 burger (170g)',
    confidence: 0.96
  },
  salad: {
    foodName: 'Chicken Caesar Salad',
    calories: 320,
    protein: 21.0,
    carbs: 10.5,
    fats: 22.0,
    fiber: 3.2,
    sugar: 2.1,
    vitamins: { 'Vitamin A': '45%', 'Vitamin C': '15%', 'Calcium': '10%' },
    minerals: { 'Iron': '8%', 'Sodium': '720mg', 'Potassium': '280mg' },
    quantity: '1 bowl (250g)',
    confidence: 0.91
  },
  apple: {
    foodName: 'Red Gala Apple',
    calories: 95,
    protein: 0.5,
    carbs: 25.0,
    fats: 0.3,
    fiber: 4.4,
    sugar: 19.0,
    vitamins: { 'Vitamin A': '2%', 'Vitamin C': '14%', 'Vitamin B6': '5%' },
    minerals: { 'Calcium': '1%', 'Iron': '1%', 'Potassium': '195mg' },
    quantity: '1 medium apple (182g)',
    confidence: 0.98
  },
  avocado_toast: {
    foodName: 'Avocado Toast with Egg',
    calories: 340,
    protein: 14.5,
    carbs: 24.0,
    fats: 21.2,
    fiber: 7.5,
    sugar: 1.8,
    vitamins: { 'Vitamin A': '10%', 'Vitamin C': '8%', 'Vitamin E': '15%' },
    minerals: { 'Iron': '12%', 'Sodium': '410mg', 'Potassium': '450mg' },
    quantity: '1 slice (150g)',
    confidence: 0.89
  },
  chicken: {
    foodName: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31.0,
    carbs: 0.0,
    fats: 3.6,
    fiber: 0.0,
    sugar: 0.0,
    vitamins: { 'Vitamin B6': '30%', 'Niacin': '74%', 'Vitamin D': '1%' },
    minerals: { 'Iron': '6%', 'Sodium': '74mg', 'Potassium': '256mg', 'Magnesium': '7%' },
    quantity: '1 fillet (100g)',
    confidence: 0.95
  },
  salmon: {
    foodName: 'Baked Atlantic Salmon',
    calories: 206,
    protein: 22.0,
    carbs: 0.0,
    fats: 12.4,
    fiber: 0.0,
    sugar: 0.0,
    vitamins: { 'Vitamin B12': '80%', 'Vitamin D': '120%', 'Vitamin A': '2%' },
    minerals: { 'Iron': '2%', 'Sodium': '60mg', 'Potassium': '360mg', 'Selenium': '55%' },
    quantity: '1 fillet (100g)',
    confidence: 0.93
  },
  sushi: {
    foodName: 'Salmon & Tuna Sushi Combo',
    calories: 380,
    protein: 18.2,
    carbs: 64.0,
    fats: 4.5,
    fiber: 2.5,
    sugar: 4.8,
    vitamins: { 'Vitamin A': '4%', 'Vitamin C': '2%', 'Vitamin B12': '30%' },
    minerals: { 'Iron': '8%', 'Sodium': '850mg', 'Potassium': '220mg' },
    quantity: '8 pieces (280g)',
    confidence: 0.92
  },
  shake: {
    foodName: 'Whey Protein Shake',
    calories: 220,
    protein: 30.0,
    carbs: 8.0,
    fats: 3.0,
    fiber: 1.5,
    sugar: 3.0,
    vitamins: { 'Vitamin A': '0%', 'Vitamin C': '0%', 'Calcium': '35%' },
    minerals: { 'Iron': '2%', 'Sodium': '160mg', 'Potassium': '280mg' },
    quantity: '1 shaker (400ml)',
    confidence: 0.97
  },
  oatmeal: {
    foodName: 'Banana & Honey Oatmeal',
    calories: 280,
    protein: 7.8,
    carbs: 56.0,
    fats: 4.5,
    fiber: 6.2,
    sugar: 18.0,
    vitamins: { 'Vitamin A': '2%', 'Vitamin C': '8%', 'Vitamin B6': '10%' },
    minerals: { 'Calcium': '4%', 'Iron': '15%', 'Potassium': '310mg' },
    quantity: '1 bowl (200g)',
    confidence: 0.90
  },
  cookie: {
    foodName: 'Chocolate Chip Cookie',
    calories: 160,
    protein: 2.0,
    carbs: 22.0,
    fats: 8.0,
    fiber: 0.8,
    sugar: 15.0,
    vitamins: { 'Vitamin A': '2%', 'Calcium': '2%' },
    minerals: { 'Iron': '6%', 'Sodium': '115mg', 'Potassium': '45mg' },
    quantity: '1 large cookie (33g)',
    confidence: 0.98
  },
  fries: {
    foodName: 'Salted French Fries',
    calories: 365,
    protein: 4.0,
    carbs: 48.0,
    fats: 17.0,
    fiber: 4.0,
    sugar: 0.3,
    vitamins: { 'Vitamin C': '15%', 'Vitamin B6': '20%' },
    minerals: { 'Iron': '6%', 'Sodium': '290mg', 'Potassium': '580mg' },
    quantity: '1 medium basket (117g)',
    confidence: 0.94
  },
  omelette: {
    foodName: 'Spinach & Cheese Omelette',
    calories: 240,
    protein: 16.5,
    carbs: 2.8,
    fats: 18.2,
    fiber: 0.8,
    sugar: 0.5,
    vitamins: { 'Vitamin A': '25%', 'Vitamin D': '15%', 'Riboflavin': '22%' },
    minerals: { 'Iron': '10%', 'Sodium': '380mg', 'Potassium': '190mg', 'Calcium': '12%' },
    quantity: '2 large eggs omelette (140g)',
    confidence: 0.88
  },
  burrito: {
    foodName: 'Spicy Beef & Rice Burrito',
    calories: 580,
    protein: 28.0,
    carbs: 68.0,
    fats: 20.0,
    fiber: 5.5,
    sugar: 3.5,
    vitamins: { 'Vitamin A': '12%', 'Vitamin C': '6%', 'Calcium': '15%' },
    minerals: { 'Iron': '22%', 'Sodium': '1200mg', 'Potassium': '420mg' },
    quantity: '1 large burrito (320g)',
    confidence: 0.93
  },
  yogurt: {
    foodName: 'Honey Greek Yogurt',
    calories: 150,
    protein: 15.0,
    carbs: 16.0,
    fats: 2.5,
    fiber: 0.0,
    sugar: 14.0,
    vitamins: { 'Vitamin A': '0%', 'Calcium': '20%', 'Vitamin D': '10%' },
    minerals: { 'Sodium': '55mg', 'Potassium': '180mg' },
    quantity: '1 tub (150g)',
    confidence: 0.95
  },
  spaghetti: {
    foodName: 'Spaghetti Bolognese',
    calories: 420,
    protein: 19.5,
    carbs: 58.0,
    fats: 11.8,
    fiber: 3.5,
    sugar: 4.8,
    vitamins: { 'Vitamin A': '8%', 'Vitamin C': '12%', 'Calcium': '4%' },
    minerals: { 'Iron': '18%', 'Sodium': '610mg', 'Potassium': '340mg' },
    quantity: '1 plate (300g)',
    confidence: 0.91
  },
  nuts: {
    foodName: 'Roasted Mixed Nuts',
    calories: 172,
    protein: 6.0,
    carbs: 6.0,
    fats: 15.0,
    fiber: 2.5,
    sugar: 1.2,
    vitamins: { 'Vitamin E': '20%', 'Vitamin B6': '5%' },
    minerals: { 'Calcium': '4%', 'Iron': '6%', 'Magnesium': '15%', 'Potassium': '180mg' },
    quantity: '1 handful (28g)',
    confidence: 0.90
  },
  donut: {
    foodName: 'Glazed Chocolate Donut',
    calories: 260,
    protein: 3.0,
    carbs: 31.0,
    fats: 14.0,
    fiber: 1.0,
    sugar: 17.0,
    vitamins: { 'Vitamin A': '1%', 'Calcium': '2%' },
    minerals: { 'Iron': '8%', 'Sodium': '270mg', 'Potassium': '60mg' },
    quantity: '1 donut (60g)',
    confidence: 0.97
  },
  banana: {
    foodName: 'Ripe Banana',
    calories: 105,
    protein: 1.3,
    carbs: 27.0,
    fats: 0.3,
    fiber: 3.1,
    sugar: 14.4,
    vitamins: { 'Vitamin C': '17%', 'Vitamin B6': '22%' },
    minerals: { 'Iron': '1%', 'Potassium': '422mg', 'Magnesium': '8%' },
    quantity: '1 medium banana (118g)',
    confidence: 0.99
  },
  steak: {
    foodName: 'Grilled Sirloin Steak',
    calories: 250,
    protein: 26.0,
    carbs: 0.0,
    fats: 15.0,
    fiber: 0.0,
    sugar: 0.0,
    vitamins: { 'Vitamin B6': '25%', 'Vitamin B12': '60%' },
    minerals: { 'Iron': '15%', 'Sodium': '320mg', 'Potassium': '390mg', 'Zinc': '35%' },
    quantity: '1 steak (150g)',
    confidence: 0.94
  }
};

// Generic food generator in case food is not directly listed
export const getGenericFoodNutrition = (foodQuery) => {
  const normalized = foodQuery.toLowerCase().trim();
  
  // Calculate based on name lengths and hashes to give realistic, repeatable numbers
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const calories = 100 + (hash % 450); // calories between 100 and 550
  const protein = Math.round(((hash % 30) + 1) * 10) / 10;
  const fats = Math.round(((hash % 20) + 0.5) * 10) / 10;
  const carbs = Math.round(((hash % 50) + 2) * 10) / 10;
  const fiber = Math.round(((hash % 6) + 0.2) * 10) / 10;
  const sugar = Math.round(((hash % 15) + 0.1) * 10) / 10;

  return {
    foodName: foodQuery.charAt(0).toUpperCase() + foodQuery.slice(1),
    calories,
    protein,
    carbs,
    fats,
    fiber,
    sugar,
    vitamins: { 'Vitamin A': '4%', 'Vitamin C': '6%', 'Calcium': '5%' },
    minerals: { 'Iron': '8%', 'Sodium': `${120 + (hash % 400)}mg`, 'Potassium': '180mg' },
    quantity: '1 serving (150g)',
    confidence: 0.85
  };
};
