import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, DataContextType, User, Meal, SideDish, Order, AppearanceSettings, MealDisplaySettings } from '../types';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

const defaultAppearanceSettings: AppearanceSettings = {
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  backgroundColor: '#f5f5f5',
  loginTitle: 'سیستم سفارش غذا',
  loginSubtitle: 'وارد حساب کاربری خود شوید',
  usernameLabel: 'نام کاربری',
  passwordLabel: 'کلمه عبور',
  loginButtonText: 'ورود',
  backgroundType: 'gradient',
  animationType: '3d',
  fontFamily: 'Vazir',
  borderRadius: 12,
  shadowIntensity: 3,
};

const defaultMealDisplaySettings: MealDisplaySettings = {
  showMenuTiming: 'wholeWeek',
  orderSubmissionDeadline: 2,
  allowMultipleSelections: false,
  showMealImages: true,
  showDescriptions: true,
};

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    users: [],
    meals: [],
    sideDishes: [],
    orders: [],
    appearanceSettings: defaultAppearanceSettings,
    mealDisplaySettings: defaultMealDisplaySettings,
  });

  useEffect(() => {
    // Load data from localStorage
    const loadDataFromStorage = () => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const meals = JSON.parse(localStorage.getItem('meals') || '[]');
        const sideDishes = JSON.parse(localStorage.getItem('sideDishes') || '[]');
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const appearanceSettings = JSON.parse(localStorage.getItem('appearanceSettings') || JSON.stringify(defaultAppearanceSettings));
        const mealDisplaySettings = JSON.parse(localStorage.getItem('mealDisplaySettings') || JSON.stringify(defaultMealDisplaySettings));

        setState(prev => ({
          ...prev,
          users,
          meals,
          sideDishes,
          orders,
          appearanceSettings,
          mealDisplaySettings,
        }));
      } catch (error) {
        console.error('Error loading data from storage:', error);
      }
    };

    loadDataFromStorage();
  }, []);

  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  };

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: generateId(),
      createdAt: new Date(),
    };
    const updatedUsers = [...state.users, newUser];
    setState(prev => ({ ...prev, users: updatedUsers }));
    saveToStorage('users', updatedUsers);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    const updatedUsers = state.users.map(user =>
      user.id === id ? { ...user, ...updates } : user
    );
    setState(prev => ({ ...prev, users: updatedUsers }));
    saveToStorage('users', updatedUsers);
  };

  const deleteUser = (id: string) => {
    const updatedUsers = state.users.filter(user => user.id !== id);
    setState(prev => ({ ...prev, users: updatedUsers }));
    saveToStorage('users', updatedUsers);
  };

  const addMeal = (meal: Omit<Meal, 'id' | 'createdAt'>) => {
    const newMeal: Meal = {
      ...meal,
      id: generateId(),
      createdAt: new Date(),
    };
    const updatedMeals = [...state.meals, newMeal];
    setState(prev => ({ ...prev, meals: updatedMeals }));
    saveToStorage('meals', updatedMeals);
  };

  const updateMeal = (id: string, updates: Partial<Meal>) => {
    const updatedMeals = state.meals.map(meal =>
      meal.id === id ? { ...meal, ...updates } : meal
    );
    setState(prev => ({ ...prev, meals: updatedMeals }));
    saveToStorage('meals', updatedMeals);
  };

  const deleteMeal = (id: string) => {
    const updatedMeals = state.meals.filter(meal => meal.id !== id);
    setState(prev => ({ ...prev, meals: updatedMeals }));
    saveToStorage('meals', updatedMeals);
  };

  const addSideDish = (sideDish: Omit<SideDish, 'id' | 'createdAt'>) => {
    const newSideDish: SideDish = {
      ...sideDish,
      id: generateId(),
      createdAt: new Date(),
    };
    const updatedSideDishes = [...state.sideDishes, newSideDish];
    setState(prev => ({ ...prev, sideDishes: updatedSideDishes }));
    saveToStorage('sideDishes', updatedSideDishes);
  };

  const updateSideDish = (id: string, updates: Partial<SideDish>) => {
    const updatedSideDishes = state.sideDishes.map(sideDish =>
      sideDish.id === id ? { ...sideDish, ...updates } : sideDish
    );
    setState(prev => ({ ...prev, sideDishes: updatedSideDishes }));
    saveToStorage('sideDishes', updatedSideDishes);
  };

  const deleteSideDish = (id: string) => {
    const updatedSideDishes = state.sideDishes.filter(sideDish => sideDish.id !== id);
    setState(prev => ({ ...prev, sideDishes: updatedSideDishes }));
    saveToStorage('sideDishes', updatedSideDishes);
  };

  const submitOrder = (order: Omit<Order, 'id' | 'submittedAt'>) => {
    const newOrder: Order = {
      ...order,
      id: generateId(),
      submittedAt: new Date(),
    };
    const updatedOrders = [...state.orders, newOrder];
    setState(prev => ({ ...prev, orders: updatedOrders }));
    saveToStorage('orders', updatedOrders);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    const updatedOrders = state.orders.map(order =>
      order.id === id ? { ...order, ...updates } : order
    );
    setState(prev => ({ ...prev, orders: updatedOrders }));
    saveToStorage('orders', updatedOrders);
  };

  const updateAppearanceSettings = (settings: Partial<AppearanceSettings>) => {
    const updatedSettings = { ...state.appearanceSettings, ...settings };
    setState(prev => ({ ...prev, appearanceSettings: updatedSettings }));
    saveToStorage('appearanceSettings', updatedSettings);
  };

  const updateMealDisplaySettings = (settings: Partial<MealDisplaySettings>) => {
    const updatedSettings = { ...state.mealDisplaySettings, ...settings };
    setState(prev => ({ ...prev, mealDisplaySettings: updatedSettings }));
    saveToStorage('mealDisplaySettings', updatedSettings);
  };

  const value: DataContextType = {
    state,
    updateState,
    addUser,
    updateUser,
    deleteUser,
    addMeal,
    updateMeal,
    deleteMeal,
    addSideDish,
    updateSideDish,
    deleteSideDish,
    submitOrder,
    updateOrder,
    updateAppearanceSettings,
    updateMealDisplaySettings,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};