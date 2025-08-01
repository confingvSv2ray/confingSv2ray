export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'regular' | 'chef' | 'vip';
  name: string;
  email?: string;
  createdAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  description?: string;
  date: Date;
  imageUrl?: string;
  isAvailable: boolean;
  category?: string;
}

export interface SideDish {
  id: string;
  name: string;
  description?: string;
  date: Date;
  imageUrl?: string;
  isAvailable: boolean;
}

export interface Guest {
  id: string;
  name: string;
  mealId?: string;
  sideDishIds: string[];
}

export interface Order {
  id: string;
  userId: string;
  date: Date;
  mealId?: string;
  sideDishIds: string[];
  guests?: Guest[];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  submittedAt: Date;
  isLocked: boolean;
}

export interface AppearanceSettings {
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  loginPageBackground: string;
  loginTitle: string;
  loginSubtitle: string;
  animation3D: boolean;
  animationType: 'fade' | 'slide' | 'rotate' | 'bounce' | 'wave';
  inputStyle: 'modern' | 'classic' | 'glassmorphism' | 'neon';
}

export interface MealDisplaySettings {
  showMenuDays: 'current' | 'week' | 'all';
  orderTimeLimit: number; // hours before meal time
  displayStyle: 'card' | 'list' | 'grid';
  showImages: boolean;
  showDescriptions: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface WeeklyMenu {
  [key: string]: {
    meals: Meal[];
    sideDishes: SideDish[];
  };
}