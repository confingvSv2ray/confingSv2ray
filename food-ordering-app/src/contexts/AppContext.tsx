import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppearanceSettings, MealDisplaySettings, Meal, SideDish, Order } from '../types';

interface AppContextType {
  // Appearance Settings
  appearanceSettings: AppearanceSettings;
  updateAppearanceSettings: (settings: Partial<AppearanceSettings>) => void;
  
  // Meal Display Settings
  mealDisplaySettings: MealDisplaySettings;
  updateMealDisplaySettings: (settings: Partial<MealDisplaySettings>) => void;
  
  // Meals and Side Dishes
  meals: Meal[];
  sideDishes: SideDish[];
  orders: Order[];
  
  // Management functions
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  updateMeal: (id: string, meal: Partial<Meal>) => void;
  deleteMeal: (id: string) => void;
  
  addSideDish: (sideDish: Omit<SideDish, 'id'>) => void;
  updateSideDish: (id: string, sideDish: Partial<SideDish>) => void;
  deleteSideDish: (id: string) => void;
  
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultAppearanceSettings: AppearanceSettings = {
  logoUrl: '',
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  backgroundColor: '#f5f5f5',
  loginPageBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  loginTitle: 'سیستم سفارش غذا',
  loginSubtitle: 'خوش آمدید',
  animation3D: true,
  animationType: 'fade',
  inputStyle: 'modern',
};

const defaultMealDisplaySettings: MealDisplaySettings = {
  showMenuDays: 'week',
  orderTimeLimit: 2,
  displayStyle: 'card',
  showImages: true,
  showDescriptions: true,
};

// Mock data
const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'خورشت قیمه',
    description: 'خورشت قیمه با برنج سفید',
    date: new Date(),
    isAvailable: true,
    category: 'اصلی',
  },
  {
    id: '2',
    name: 'کباب کوبیده',
    description: 'کباب کوبیده با برنج و سالاد',
    date: new Date(),
    isAvailable: true,
    category: 'اصلی',
  },
];

const mockSideDishes: SideDish[] = [
  {
    id: '1',
    name: 'سالاد شیرازی',
    description: 'سالاد تازه با خیار و گوجه',
    date: new Date(),
    isAvailable: true,
  },
  {
    id: '2',
    name: 'ماست و خیار',
    description: 'ماست تازه با خیار خرد شده',
    date: new Date(),
    isAvailable: true,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>(defaultAppearanceSettings);
  const [mealDisplaySettings, setMealDisplaySettings] = useState<MealDisplaySettings>(defaultMealDisplaySettings);
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [sideDishes, setSideDishes] = useState<SideDish[]>(mockSideDishes);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load settings from localStorage
    const savedAppearance = localStorage.getItem('appearanceSettings');
    const savedMealDisplay = localStorage.getItem('mealDisplaySettings');
    const savedMeals = localStorage.getItem('meals');
    const savedSideDishes = localStorage.getItem('sideDishes');
    const savedOrders = localStorage.getItem('orders');

    if (savedAppearance) {
      setAppearanceSettings(JSON.parse(savedAppearance));
    }
    if (savedMealDisplay) {
      setMealDisplaySettings(JSON.parse(savedMealDisplay));
    }
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    }
    if (savedSideDishes) {
      setSideDishes(JSON.parse(savedSideDishes));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const updateAppearanceSettings = (settings: Partial<AppearanceSettings>) => {
    const newSettings = { ...appearanceSettings, ...settings };
    setAppearanceSettings(newSettings);
    localStorage.setItem('appearanceSettings', JSON.stringify(newSettings));
  };

  const updateMealDisplaySettings = (settings: Partial<MealDisplaySettings>) => {
    const newSettings = { ...mealDisplaySettings, ...settings };
    setMealDisplaySettings(newSettings);
    localStorage.setItem('mealDisplaySettings', JSON.stringify(newSettings));
  };

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal = { ...meal, id: Date.now().toString() };
    const newMeals = [...meals, newMeal];
    setMeals(newMeals);
    localStorage.setItem('meals', JSON.stringify(newMeals));
  };

  const updateMeal = (id: string, mealUpdate: Partial<Meal>) => {
    const newMeals = meals.map(meal => 
      meal.id === id ? { ...meal, ...mealUpdate } : meal
    );
    setMeals(newMeals);
    localStorage.setItem('meals', JSON.stringify(newMeals));
  };

  const deleteMeal = (id: string) => {
    const newMeals = meals.filter(meal => meal.id !== id);
    setMeals(newMeals);
    localStorage.setItem('meals', JSON.stringify(newMeals));
  };

  const addSideDish = (sideDish: Omit<SideDish, 'id'>) => {
    const newSideDish = { ...sideDish, id: Date.now().toString() };
    const newSideDishes = [...sideDishes, newSideDish];
    setSideDishes(newSideDishes);
    localStorage.setItem('sideDishes', JSON.stringify(newSideDishes));
  };

  const updateSideDish = (id: string, sideDishUpdate: Partial<SideDish>) => {
    const newSideDishes = sideDishes.map(sideDish => 
      sideDish.id === id ? { ...sideDish, ...sideDishUpdate } : sideDish
    );
    setSideDishes(newSideDishes);
    localStorage.setItem('sideDishes', JSON.stringify(newSideDishes));
  };

  const deleteSideDish = (id: string) => {
    const newSideDishes = sideDishes.filter(sideDish => sideDish.id !== id);
    setSideDishes(newSideDishes);
    localStorage.setItem('sideDishes', JSON.stringify(newSideDishes));
  };

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder = { ...order, id: Date.now().toString() };
    const newOrders = [...orders, newOrder];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  const updateOrder = (id: string, orderUpdate: Partial<Order>) => {
    const newOrders = orders.map(order => 
      order.id === id ? { ...order, ...orderUpdate } : order
    );
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  const value: AppContextType = {
    appearanceSettings,
    updateAppearanceSettings,
    mealDisplaySettings,
    updateMealDisplaySettings,
    meals,
    sideDishes,
    orders,
    addMeal,
    updateMeal,
    deleteMeal,
    addSideDish,
    updateSideDish,
    deleteSideDish,
    addOrder,
    updateOrder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};