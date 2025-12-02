import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_LIBRARY_ITEMS, PLAN_FEATURES } from '../constants';
import { Card, Button, Input, CryptoPaymentModal } from '../components/UI';
import { Link } from 'react-router-dom';
import { UserPlan } from '../types';

export const Dashboard: React.FC = () => {
  const { user, updateProfile, upgradeUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');

  // Upgrade Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [targetPlan, setTargetPlan] = useState<UserPlan>(UserPlan.PRO);

  if (!user) return <div className="p-8 text-center dark:text-white">Please log in.</div>;

  const handleSaveProfile = () => {
    updateProfile({ name, bio });
    setIsEditing(false);
  };

  const handleUpgradeClick = () => {
      // Default upgrade to Pro
      setTargetPlan(UserPlan.PRO);
      setShowPaymentModal(true);
  };

  const savedItems = MOCK_LIBRARY_ITEMS.filter(item => user.savedItemIds.includes(item.id));
  const recentItems = MOCK_LIBRARY_ITEMS.filter(item => user.recentlyViewedIds.includes(item.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
            <h3 className="text-indigo-100 text-sm font-medium">Current Plan</h3>
            <div className="flex justify-between items-center mt-1">
                <p className="text-3xl font-bold">{PLAN_FEATURES[user.plan].name}</p>
                {user.plan === UserPlan.FREE && (
                    <Button size="sm" variant="secondary" onClick={handleUpgradeClick}>
                        <i className="fa-solid fa-crown mr-2 text-yellow-500"></i>
                        Upgrade
                    </Button>
                )}
            </div>
         </Card>
         <Card className="p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">AI Credits</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {user.credits === Infinity ? '∞' : user.credits}
            </p>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Section */}
            <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Profile Settings</h2>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                </div>
                
                {isEditing ? (
                    <div className="space-y-4">
                        <Input label="Display Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                            <textarea 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-800 dark:text-white" 
                                rows={3}
                                value={bio} 
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full mr-4" />
                        <div>
                            <p className="font-bold text-lg dark:text-white">{user.name}</p>
                            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{user.bio}</p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Saved Items */}
             <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Saved Resources</h3>
                {savedItems.length === 0 ? (
                    <div className="text-center py-8 bg-white dark:bg-slate-800 rounded-lg border border-dashed border-gray-300 dark:border-slate-700">
                        <p className="text-gray-500 dark:text-gray-400">No items saved yet.</p>
                        <Link to="/library" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm mt-2 block">Browse Library</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {savedItems.map(item => (
                            <Link key={item.id} to={`/library/${item.id}`}>
                                <Card hover className="p-4 h-full">
                                    <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                    <span className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded mt-2 inline-block">{item.category}</span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
            <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recently Viewed</h3>
                <div className="space-y-3">
                    {recentItems.length === 0 ? <p className="text-sm text-gray-500 dark:text-gray-400">No history yet.</p> : null}
                     {recentItems.map(item => (
                         <Link key={item.id} to={`/library/${item.id}`} className="block group">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">{item.title}</span>
                                <i className="fa-solid fa-chevron-right text-xs text-gray-400"></i>
                            </div>
                         </Link>
                    ))}
                </div>
            </Card>
        </div>
      </div>

      <CryptoPaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={targetPlan}
        amount={PLAN_FEATURES[targetPlan].priceVal || 0}
        onSuccess={() => upgradeUser(targetPlan)}
      />

    </div>
  );
};