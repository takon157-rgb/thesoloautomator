import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { generateContent, toolsPrompts } from '../services/geminiService';
import { Button, Card, Input, Modal } from '../components/UI';
import { useNavigate } from 'react-router-dom';

type ToolType = 'idea' | 'email' | 'ad';

export const Tools: React.FC = () => {
  const { user, deductCredit, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ToolType>('idea');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  
  const [ideaNiche, setIdeaNiche] = useState('');
  const [emailRecipient, setEmailRecipient] = useState('');
  const [emailTopic, setEmailTopic] = useState('');
  const [adProduct, setAdProduct] = useState('');
  const [adAudience, setAdAudience] = useState('');
  
  const [showCreditModal, setShowCreditModal] = useState(false);

  const handleGenerate = async () => {
    if (!isAuthenticated) {
        navigate('/login');
        return;
    }

    if (!deductCredit()) {
        setShowCreditModal(true);
        return;
    }

    setLoading(true);
    setResult('');
    
    try {
        let prompt = '';
        if (activeTab === 'idea') {
            prompt = toolsPrompts.ideaGenerator(ideaNiche);
        } else if (activeTab === 'email') {
            prompt = toolsPrompts.emailGenerator(emailRecipient, emailTopic);
        } else {
            prompt = toolsPrompts.adCopyGenerator(adProduct, adAudience);
        }

        const response = await generateContent(prompt);
        setResult(response);
    } catch (err) {
        setResult('Error generating content. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  const tabs = [
    { id: 'idea', label: 'Idea Generator', icon: 'fa-lightbulb' },
    { id: 'email', label: 'Cold Email Writer', icon: 'fa-envelope' },
    { id: 'ad', label: 'Ad Copy Generator', icon: 'fa-bullhorn' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Tool Suite</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Generate assets instantly. Cost: 1 Credit per generation.</p>
        {user && (
            <div className="mt-4 inline-block bg-indigo-50 dark:bg-indigo-900 px-4 py-2 rounded-full text-indigo-700 dark:text-indigo-200 font-medium">
                Credits Available: {user.credits === Infinity ? 'Unlimited' : user.credits}
            </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Tool Selector */}
        <div className="md:w-1/4">
            <nav className="flex flex-col space-y-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id as ToolType); setResult(''); }}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                            activeTab === tab.id 
                            ? 'bg-indigo-600 text-white shadow-md dark:bg-indigo-500' 
                            : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                        }`}
                    >
                        <i className={`fa-solid ${tab.icon} w-6 text-center mr-3`}></i>
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>

        {/* Input Area */}
        <div className="md:w-3/4">
            <Card className="p-6 min-h-[500px]">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                    
                    {activeTab === 'idea' && (
                        <div className="space-y-4">
                            <Input 
                                label="Target Niche/Industry" 
                                placeholder="e.g., Remote Workers, Pet Owners, Crypto Traders"
                                value={ideaNiche}
                                onChange={(e) => setIdeaNiche(e.target.value)}
                            />
                        </div>
                    )}

                    {activeTab === 'email' && (
                        <div className="space-y-4">
                            <Input 
                                label="Recipient (Name/Role)" 
                                placeholder="e.g., VP of Marketing"
                                value={emailRecipient}
                                onChange={(e) => setEmailRecipient(e.target.value)}
                            />
                            <Input 
                                label="Topic/Value Prop" 
                                placeholder="e.g., SEO Services"
                                value={emailTopic}
                                onChange={(e) => setEmailTopic(e.target.value)}
                            />
                        </div>
                    )}

                    {activeTab === 'ad' && (
                        <div className="space-y-4">
                            <Input 
                                label="Product Name" 
                                placeholder="e.g., SoloAutomator"
                                value={adProduct}
                                onChange={(e) => setAdProduct(e.target.value)}
                            />
                            <Input 
                                label="Target Audience" 
                                placeholder="e.g., Solopreneurs"
                                value={adAudience}
                                onChange={(e) => setAdAudience(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="mt-6">
                        <Button 
                            onClick={handleGenerate} 
                            disabled={loading || (activeTab === 'idea' && !ideaNiche)} 
                            className="w-full sm:w-auto"
                            isLoading={loading}
                        >
                            Generate Content <span className="ml-2 opacity-75 text-xs bg-black/20 px-2 py-0.5 rounded">-1 Credit</span>
                        </Button>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Result</h3>
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded"></div>
                            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded"></div>
                            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                        </div>
                    ) : result ? (
                        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg border border-gray-200 dark:border-slate-700 prose max-w-none text-sm whitespace-pre-wrap dark:text-gray-300">
                            {result}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-400 dark:text-gray-500">
                            Configure the settings above and click generate to see AI magic.
                        </div>
                    )}
                </div>
            </Card>
        </div>
      </div>

      <Modal isOpen={showCreditModal} onClose={() => setShowCreditModal(false)} title="Out of Credits">
        <p className="text-gray-500 dark:text-gray-400 mb-6">You've used all your free credits. Upgrade to Pro to get 500+ credits per month.</p>
        <Button className="w-full" onClick={() => navigate('/pricing')}>View Upgrade Options</Button>
      </Modal>
    </div>
  );
};