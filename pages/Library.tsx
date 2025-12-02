import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_LIBRARY_ITEMS } from '../constants';
import { LibraryCategory } from '../types';
import { Badge, Card, Input } from '../components/UI';
import { useAuth } from '../context/AuthContext';

export const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { user } = useAuth();

  const categories = ['All', ...Object.values(LibraryCategory)];

  const filteredItems = MOCK_LIBRARY_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resource Library</h1>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
        <div className="flex-1 max-w-md">
           <Input 
             placeholder="Search templates, ideas..." 
             value={searchTerm} 
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full"
           />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat 
                        ? 'bg-indigo-600 text-white dark:bg-indigo-500' 
                        : 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
             return (
                <Link key={item.id} to={`/library/${item.id}`}>
                    <Card hover className="h-full flex flex-col">
                        <div className="h-40 bg-gray-200 dark:bg-slate-700 relative overflow-hidden">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                            <div className="absolute top-2 right-2">
                                <Badge color={item.isPremium ? 'yellow' : 'green'}>
                                    {item.isPremium ? 'PREMIUM' : 'FREE'}
                                </Badge>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">{item.category}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{item.description}</p>
                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-700">
                                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    View Details &rarr;
                                </span>
                            </div>
                        </div>
                    </Card>
                </Link>
            );
        })}
      </div>
      
      {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              No items found matching your criteria.
          </div>
      )}
    </div>
  );
};