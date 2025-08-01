import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './components/Login';
import AdminLayout from './components/admin/AdminLayout';
import FoodManagement from './components/admin/FoodManagement';
import AppearanceManagement from './components/admin/AppearanceManagement';
import UserManagement from './components/admin/UserManagement';
import SideDishManagement from './components/admin/SideDishManagement';
import MealDisplaySettings from './components/admin/MealDisplaySettings';
import Dashboard from './components/admin/Dashboard';
import UserPanel from './components/user/UserPanel';
import VIPUserPanel from './components/user/VIPUserPanel';
import ChefPanel from './components/chef/ChefPanel';
import './App.css';

const AdminApp: React.FC = () => {
  const { user } = useAuth();
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'food-management':
        return <FoodManagement />;
      case 'side-dish-management':
        return <SideDishManagement />;
      case 'user-management':
        return <UserManagement />;
      case 'appearance-management':
        return <AppearanceManagement />;
      case 'meal-display-settings':
        return <MealDisplaySettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderSection()}
    </AdminLayout>
  );
};

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  // Route based on user role
  switch (user?.role) {
    case 'admin':
      return <AdminApp />;
    case 'regular':
      return <UserPanel />;
    case 'vip':
      return <VIPUserPanel />;
    case 'chef':
      return <ChefPanel />;
    default:
      return <Login />;
  }
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
