import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login, Register } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Library } from './pages/Library';
import { ItemDetail } from './pages/ItemDetail';
import { Tools } from './pages/Tools';

// Simple wrapper to scroll top on route change
const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="library" element={<Library />} />
            <Route path="library/:id" element={<ItemDetail />} />
            <Route path="tools" element={<Tools />} />
            <Route path="pricing" element={<Landing />} /> {/* Scroll to pricing section logically handled in Landing or separate page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;