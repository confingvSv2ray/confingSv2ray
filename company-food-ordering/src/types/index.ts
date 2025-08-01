export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'regular' | 'chef' | 'vip';
  fullName: string;
  email?: string;
  createdAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  description?: string;
  image?: string;
  date: string; // YYYY-MM-DD format
  mealType: 'first' | 'second' | 'custom';
  isActive: boolean;
  createdAt: Date;
}

export interface SideDish {
  id: string;
  name: string;
  description?: string;
  image?: string;
  date: string; // YYYY-MM-DD format
  isActive: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  date: string; // YYYY-MM-DD format
  mealId?: string;
  mealName?: string;
  sideDishIds: string[];
  sideDishNames: string[];
  isLocked: boolean;
  guests?: GuestOrder[];
  submittedAt: Date;
}

export interface GuestOrder {
  id: string;
  guestName: string;
  mealId?: string;
  mealName?: string;
  sideDishIds: string[];
  sideDishNames: string[];
}

export interface AppearanceSettings {
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  loginTitle: string;
  loginSubtitle: string;
  usernameLabel: string;
  passwordLabel: string;
  loginButtonText: string;
  backgroundType: 'gradient' | 'solid' | 'image';
  backgroundImage?: string;
  animationType: '2d' | '3d' | '5d';
  fontFamily: string;
  borderRadius: number;
  shadowIntensity: number;
}

export interface MealDisplaySettings {
  showMenuTiming: 'currentDay' | 'wholeWeek' | 'custom';
  orderSubmissionDeadline: number; // hours before meal time
  allowMultipleSelections: boolean;
  showMealImages: boolean;
  showDescriptions: boolean;
}

export interface AppState {
  currentUser: User | null;
  users: User[];
  meals: Meal[];
  sideDishes: SideDish[];
  orders: Order[];
  appearanceSettings: AppearanceSettings;
  mealDisplaySettings: MealDisplaySettings;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface DataContextType {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addMeal: (meal: Omit<Meal, 'id' | 'createdAt'>) => void;
  updateMeal: (id: string, updates: Partial<Meal>) => void;
  deleteMeal: (id: string) => void;
  addSideDish: (sideDish: Omit<SideDish, 'id' | 'createdAt'>) => void;
  updateSideDish: (id: string, updates: Partial<SideDish>) => void;
  deleteSideDish: (id: string) => void;
  submitOrder: (order: Omit<Order, 'id' | 'submittedAt'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  updateAppearanceSettings: (settings: Partial<AppearanceSettings>) => void;
  updateMealDisplaySettings: (settings: Partial<MealDisplaySettings>) => void;
}