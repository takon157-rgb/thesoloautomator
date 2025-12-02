import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlan } from '../types';
import { Tour } from './UI';

const NavLink: React.FC<{ to: string; children: React.ReactNode; mobile?: boolean; onClick?: () => void }> = ({ to, children, mobile, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const baseClasses = mobile
    ? "block px-3 py-2 rounded-md text-base font-medium transition-colors"
    : "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  
  const activeClasses = isActive 
    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200" 
    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800";

  return (
    <Link to={to} className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      {children}
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center group gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                 <i className="fa-solid fa-microchip text-3xl"></i>
              </div>
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white uppercase" style={{fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em'}}>
                THESOLOAUTOMATOR
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4 items-center">
              <NavLink to="/library">Library</NavLink>
              <NavLink to="/tools">AI Tools</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700 focus:outline-none transition-transform hover:rotate-12"
                aria-label="Toggle Dark Mode"
            >
                {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
            </button>

            {user ? (
              <>
                <div className="flex flex-col items-end text-xs mr-2 text-gray-500 dark:text-gray-400">
                  <span>
                    <i className="fa-solid fa-bolt text-yellow-500 mr-1 animate-pulse"></i>
                    {user.plan === UserPlan.FREE ? `${user.credits} Credits` : 'Unlimited'}
                  </span>
                </div>
                <div className="relative group">
                    <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <img className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-600" src={user.avatar} alt={user.name} />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 hidden group-hover:block hover:block border dark:border-slate-700 transform origin-top-right transition-all duration-200">
                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">Dashboard</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">Sign out</button>
                    </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Log in</Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors hover:shadow-indigo-500/50 hover:-translate-y-0.5 transform">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
             <button 
                onClick={toggleTheme}
                className="p-2 mr-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700 focus:outline-none"
            >
                {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <i className="fa-solid fa-xmark text-xl"></i> : <i className="fa-solid fa-bars text-xl"></i>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-white dark:bg-slate-800 border-t dark:border-slate-700">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink to="/library" mobile onClick={() => setIsOpen(false)}>Library</NavLink>
            <NavLink to="/tools" mobile onClick={() => setIsOpen(false)}>AI Tools</NavLink>
            <NavLink to="/pricing" mobile onClick={() => setIsOpen(false)}>Pricing</NavLink>
            {user ? (
                <>
                    <NavLink to="/dashboard" mobile onClick={() => setIsOpen(false)}>Dashboard</NavLink>
                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-slate-700">
                        Sign Out
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login" mobile onClick={() => setIsOpen(false)}>Log In</NavLink>
                    <NavLink to="/register" mobile onClick={() => setIsOpen(false)}>Sign Up</NavLink>
                </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-microchip text-indigo-600 text-xl"></i>
              <span className="font-bold text-lg dark:text-white tracking-tight">THESOLOAUTOMATOR</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Empowering solo founders with AI-driven tools and workflows.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/library" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Library</Link></li>
              <li><Link to="/tools" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Tools</Link></li>
              <li><Link to="/pricing" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Documentation</a></li>
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-slate-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} THESOLOAUTOMATOR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
      <Navbar />
      <Tour />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};