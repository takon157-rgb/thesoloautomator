import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../components/UI';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    // In a real app we would await login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or <Link to="/register" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">start your free trial</Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input 
            label="Email address" 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Password" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
             <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Forgot your password?</a>
             </div>
          </div>
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
      </Card>
    </div>
  );
};

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Get 20 free AI credits instantly.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input 
            label="Full Name" 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            label="Email address" 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Password" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">Create Account</Button>
        </form>
      </Card>
    </div>
  );
};