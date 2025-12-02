import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CryptoPaymentModal } from '../components/UI';
import { PLAN_FEATURES, CRYPTO_CONFIG } from '../constants';
import { useAuth } from '../context/AuthContext';
import { UserPlan } from '../types';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-slate-700 py-4">
      <button 
        className="flex justify-between w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 dark:text-white">{question}</span>
        <span className="ml-6 text-indigo-600 dark:text-indigo-400">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <p className="mt-3 text-gray-500 dark:text-gray-400">{answer}</p>}
    </div>
  );
};

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user, upgradeUser } = useAuth();
  
  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<UserPlan | null>(null);

  const handlePlanSelect = (planKey: string) => {
    const plan = planKey as UserPlan;
    if (plan === UserPlan.FREE) {
        if (!user) navigate('/register');
        return;
    }

    if (!user) {
        navigate('/register');
    } else {
        // Trigger crypto payment
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedPlan) {
        upgradeUser(selectedPlan);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-16 pb-24 lg:pt-32 transition-colors">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 dark:brightness-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wide mb-6">
                    <span className="mr-2">🚀</span> v2.0 Now Live
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                    Automate Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Solo Journey</span>
                </h1>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                    Access premium startup ideas, automation workflows, and AI tools designed specifically for solopreneurs. Build more, manage less.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                    <Button size="lg" onClick={() => navigate('/register')} className="shadow-lg shadow-indigo-500/30 hover:-translate-y-1 transform transition-all duration-300">Start Building Free</Button>
                    <Button size="lg" variant="secondary" onClick={() => navigate('/library')} className="hover:-translate-y-1 transform transition-all duration-300">Browse Library</Button>
                </div>
                
                <div className="mt-16 flex justify-center lg:justify-start gap-8 grayscale opacity-50">
                    <div className="font-bold text-xl text-gray-400">TechCrunch</div>
                    <div className="font-bold text-xl text-gray-400">ProductHunt</div>
                    <div className="font-bold text-xl text-gray-400">IndieHackers</div>
                </div>
            </div>

            {/* 3D Visual */}
            <div className="relative h-[400px] hidden lg:block perspective-1000">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96">
                    {/* Floating Cards Stack */}
                    <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 animate-float-slow z-30 flex flex-col p-6 rotate-y-12 rotate-x-6 transform-style-3d">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <i className="fa-solid fa-wand-magic-sparkles"></i>
                            </div>
                            <div>
                                <div className="h-3 w-24 bg-gray-200 dark:bg-slate-600 rounded mb-1"></div>
                                <div className="h-2 w-16 bg-gray-100 dark:bg-slate-700 rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded"></div>
                            <div className="h-2 w-5/6 bg-gray-100 dark:bg-slate-700 rounded"></div>
                            <div className="h-2 w-4/6 bg-gray-100 dark:bg-slate-700 rounded"></div>
                        </div>
                        <div className="mt-auto">
                             <div className="h-8 w-full bg-indigo-600 rounded opacity-20"></div>
                        </div>
                    </div>
                    
                    {/* Background Card 1 */}
                    <div className="absolute top-4 -right-12 w-full h-full bg-gray-50 dark:bg-slate-700 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-600 animate-float-medium z-20 scale-95 opacity-80 blur-[1px]"></div>
                    
                    {/* Background Card 2 */}
                    <div className="absolute top-8 -right-24 w-full h-full bg-gray-100 dark:bg-slate-600 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-500 animate-float-fast z-10 scale-90 opacity-60 blur-[2px]"></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-10 -left-10 w-16 h-16 bg-yellow-400 rounded-xl shadow-lg animate-bounce delay-700 flex items-center justify-center text-2xl z-40">
                         💡
                    </div>
                    <div className="absolute bottom-10 -right-20 w-20 h-20 bg-green-500 rounded-full shadow-lg animate-pulse z-40 flex items-center justify-center text-white font-bold text-xl">
                         $$$
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Everything you need to launch
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-8" tilt>
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                        <i className="fa-solid fa-lightbulb text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Curated Ideas</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Access our database of vetted micro-SaaS and niche business ideas ready for execution.</p>
                </Card>
                <Card className="p-8" tilt>
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                        <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI Generators</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Generate ad copy, cold emails, and business plans instantly with our fine-tuned AI models.</p>
                </Card>
                <Card className="p-8" tilt>
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                        <i className="fa-solid fa-gears text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Automation Templates</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Copy-paste workflows to put your marketing, sales, and operations on autopilot.</p>
                </Card>
            </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="lg:text-center mb-16">
                <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Workflow</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    How THESOLOAUTOMATOR works
                </p>
             </div>
             <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex-1 text-center group">
                    <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl font-black text-gray-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">1</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2 dark:text-white">Sign Up</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">Create a free account to access free templates and 20 AI credits instantly.</p>
                </div>
                <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-gray-200 via-indigo-200 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700"></div>
                <div className="flex-1 text-center group">
                    <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl font-black text-gray-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">2</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2 dark:text-white">Explore & Access</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">Browse the library. Free items are open to all; upgrade for premium blueprints.</p>
                </div>
                <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-gray-200 via-indigo-200 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700"></div>
                <div className="flex-1 text-center group">
                    <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                         <span className="text-4xl font-black text-gray-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">3</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2 dark:text-white">Execute</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">Use the tools and templates to launch your project.</p>
                </div>
             </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gray-50 dark:bg-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Simple, transparent pricing</h2>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">Invest in your productivity, not overhead.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {Object.entries(PLAN_FEATURES).map(([key, plan]) => {
                    const isPro = plan.name === 'Pro';
                    const isBusiness = plan.name === 'Business';
                    
                    return (
                    <div 
                        key={plan.name} 
                        className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-2xl 
                            ${isPro 
                                ? 'bg-white dark:bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/20 z-10 lg:-mt-4 lg:mb-4 shadow-xl shadow-indigo-500/10' 
                                : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm'
                            }
                        `}
                    >
                        {isPro && (
                            <div className="absolute -top-5 left-0 right-0 mx-auto w-32 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full text-center shadow-lg">
                                MOST POPULAR
                            </div>
                        )}
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                                <span className="ml-2 text-xl font-medium text-gray-500 dark:text-gray-400">/mo</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {isPro ? 'For growing solopreneurs.' : isBusiness ? 'For scaling startups.' : 'For those just starting out.'}
                            </p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                                    <i className="fa-solid fa-check text-green-500 text-xs"></i>
                                </div>
                                <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium">{plan.unlocks}</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                                    <i className="fa-solid fa-check text-green-500 text-xs"></i>
                                </div>
                                <span className="ml-3 text-gray-600 dark:text-gray-300">{plan.credits}</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                                    <i className="fa-solid fa-check text-green-500 text-xs"></i>
                                </div>
                                <span className="ml-3 text-gray-600 dark:text-gray-300">{plan.support} support</span>
                            </li>
                            {isPro || isBusiness ? (
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mt-0.5">
                                        <i className="fa-brands fa-bitcoin text-indigo-500 text-xs"></i>
                                    </div>
                                    <span className="ml-3 text-indigo-600 dark:text-indigo-400 font-semibold">Crypto Payments Accepted</span>
                                </li>
                            ) : null}
                        </ul>

                        <div className="mt-auto">
                            <Button 
                                className="w-full py-3 text-lg" 
                                variant={isPro ? 'primary' : 'outline'}
                                onClick={() => handlePlanSelect(key)}
                            >
                                {plan.name === 'Free' ? 'Start Free' : `Upgrade to ${plan.name}`}
                            </Button>
                            
                            {(isPro || isBusiness) && (
                                <div className="mt-4 flex justify-center gap-3 opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500" title="Ethereum">
                                        <div className="w-5 h-5 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                            <i className="fa-brands fa-ethereum"></i>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500" title="Bitcoin">
                                        <div className="w-5 h-5 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                            <i className="fa-brands fa-bitcoin"></i>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500" title="Solana">
                                        <div className="w-5 h-5 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-[10px]">S</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )})}
            </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">Frequently asked questions</h2>
            <div className="space-y-2">
                <FAQItem question="What is included in the Free plan?" answer="The Free plan gives you access to all non-premium library items and 20 monthly AI credits." />
                <FAQItem question="How do AI Credits work?" answer="Each time you generate content (emails, ideas, copy) with our AI tools, 1 credit is deducted." />
                <FAQItem question="Can I pay with Crypto?" answer="Yes! We accept Ethereum, Bitcoin, and Solana. Payments are processed immediately after blockchain confirmation." />
            </div>
        </div>
      </section>

      {/* Payment Modal */}
      {selectedPlan && (
        <CryptoPaymentModal 
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            plan={selectedPlan}
            amount={PLAN_FEATURES[selectedPlan].priceVal || 0}
            onSuccess={handlePaymentSuccess}
        />
      )}

    </div>
  );
};