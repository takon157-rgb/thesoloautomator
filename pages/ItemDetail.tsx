import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_LIBRARY_ITEMS, PLAN_FEATURES } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Button, Modal, Card, Badge, CryptoPaymentModal } from '../components/UI';
import { UserPlan } from '../types';

export const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, saveItem, addToHistory, upgradeUser } = useAuth();
  
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAuthWall, setShowAuthWall] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const item = MOCK_LIBRARY_ITEMS.find(i => i.id === id);
  const isSaved = user ? user.savedItemIds.includes(id || '') : false;

  const canAccess = item && (!item.isPremium || (user && user.plan !== UserPlan.FREE));

  useEffect(() => {
    if (item && user) {
        addToHistory(item.id);
    }
  }, [item, user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!item) return <div className="p-8 text-center dark:text-white">Item not found</div>;

  const handleAccessCheck = () => {
      if (!user) {
          setShowAuthWall(true);
          return;
      }
      if (!canAccess) {
          setShowPaywall(true);
      }
  };

  const handleSave = () => {
      if(!user) {
          setShowAuthWall(true);
          return;
      }
      saveItem(item.id);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
            <Badge color={item.isPremium ? 'yellow' : 'green'}>{item.isPremium ? 'Premium' : 'Free'}</Badge>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Badge>{item.category}</Badge>
            {item.tags.map(tag => <span key={tag} className="text-xs text-gray-500 dark:text-gray-400">#{tag}</span>)}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">{item.description}</p>
        
        <div className="mt-6 flex gap-4">
            <Button variant="secondary" onClick={handleSave}>
                <i className={`fa-${isSaved ? 'solid' : 'regular'} fa-bookmark mr-2 ${isSaved ? 'text-indigo-600 dark:text-indigo-400' : ''}`}></i>
                {isSaved ? 'Saved' : 'Save'}
            </Button>
            {/* Share button mock */}
            <Button variant="ghost">
                <i className="fa-solid fa-share-nodes mr-2"></i> Share
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
             <Card className="p-0 overflow-hidden min-h-[400px]">
                <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                    {(canAccess || !item.isPremium) ? (
                        <div className="prose max-w-none text-gray-800 dark:text-gray-300 whitespace-pre-line">
                            {/* In a real app, use ReactMarkdown here */}
                            {item.fullContent}
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="filter blur-sm select-none dark:text-gray-500" aria-hidden="true">
                                <p className="mb-4">## Overview</p>
                                <p className="mb-4">This content is locked. It contains detailed steps, code snippets, and specific strategies to execute this idea.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                <p className="mt-4">1. Step one of the process...</p>
                                <p>2. Step two involves configuration...</p>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-slate-800/60">
                                <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-100 dark:border-slate-700">
                                    <i className="fa-solid fa-lock text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Premium Blueprint</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        Upgrade to Pro to access this blueprint and all other premium content.
                                    </p>
                                    <Button onClick={handleAccessCheck}>Upgrade to Access</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
             </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">About this Item</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex justify-between">
                        <span>Difficulty</span>
                        <span className="font-medium text-gray-900 dark:text-white">Medium</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Time to Launch</span>
                        <span className="font-medium text-gray-900 dark:text-white">~2 Days</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Last Updated</span>
                        <span className="font-medium text-gray-900 dark:text-white">Oct 2023</span>
                    </li>
                </ul>
                {!canAccess && (
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
                        <Button className="w-full" onClick={handleAccessCheck}>Unlock Access</Button>
                    </div>
                )}
            </Card>
          </div>
      </div>

      {/* Auth Wall Modal */}
      <Modal 
        isOpen={showAuthWall} 
        onClose={() => setShowAuthWall(false)}
        title="Create your Free Account"
      >
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
                <i className="fa-solid fa-user-plus text-indigo-600 dark:text-indigo-400"></i>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Join SoloAutomator today. Access free templates instantly and get 20 AI credits.</p>
            <Button className="w-full mb-3" onClick={() => navigate('/register')}>Sign Up Free</Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate('/login')}>Already have an account? Log in</Button>
        </div>
      </Modal>

      {/* Paywall Modal */}
      <Modal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)}
        title="Upgrade to Pro"
      >
        <div className="text-center">
             <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-4">
                <i className="fa-solid fa-crown text-yellow-600 dark:text-yellow-400"></i>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6">This is a Premium Blueprint. Upgrade to SoloAutomator Pro to unlock this and all other premium resources.</p>
            
            <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg text-left mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900 dark:text-white">Pro Plan</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">$29/mo</span>
                </div>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    <li><i className="fa-solid fa-check text-green-500 mr-2"></i>Unlimited Library Access</li>
                    <li><i className="fa-solid fa-check text-green-500 mr-2"></i>500 AI Credits</li>
                    <li><i className="fa-solid fa-check text-green-500 mr-2"></i>Email Support</li>
                </ul>
            </div>

            <Button className="w-full" onClick={() => { setShowPaywall(false); setShowPaymentModal(true); }}>
                Upgrade with Crypto
            </Button>
             <p className="text-xs text-gray-400 mt-2">Secure payment via ETH, BTC, or SOL</p>
        </div>
      </Modal>

      {/* Crypto Payment Modal */}
      <CryptoPaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={UserPlan.PRO}
        amount={PLAN_FEATURES[UserPlan.PRO].priceVal || 29}
        onSuccess={() => upgradeUser(UserPlan.PRO)}
      />

    </div>
  );
};