import React, { ReactNode, useEffect, useState, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { UserPlan } from '../types';
import { CRYPTO_CONFIG } from '../constants';

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm shadow-indigo-500/30 dark:bg-indigo-500 dark:hover:bg-indigo-600",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 shadow-sm dark:bg-slate-800 dark:text-gray-200 dark:border-slate-600 dark:hover:bg-slate-700",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-slate-800",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-gray-200"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <input
        className={`appearance-none block w-full px-3 py-2 border ${error ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-slate-600'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow bg-white dark:bg-slate-800 dark:text-white ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

// Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-slate-900 dark:opacity-80 backdrop-blur-sm" onClick={onClose}></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full scale-100 animate-fade-in-up">
          <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  {children}
                </div>
              </div>
            </div>
          </div>
          {footer && (
            <div className="bg-gray-50 dark:bg-slate-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// Card with 3D Tilt Effect
export const Card: React.FC<{ children: ReactNode; className?: string; hover?: boolean; tilt?: boolean }> = ({ children, className = '', hover = false, tilt = false }) => {
  const [transform, setTransform] = useState('');
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation - subtle 3D effect
    const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    setTransform('');
  };

  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden ${hover && !tilt ? 'transition-transform hover:-translate-y-1 hover:shadow-md' : ''} ${className} ${tilt ? 'transform-gpu' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: transform, 
        transition: tilt ? 'transform 0.1s ease-out' : 'transform 0.3s ease',
        willChange: tilt ? 'transform' : 'auto'
      }}
    >
      {children}
    </div>
  );
};

// Badge
export const Badge: React.FC<{ children: ReactNode; color?: 'indigo' | 'green' | 'blue' | 'yellow' }> = ({ children, color = 'indigo' }) => {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

// Crypto Payment Modal
interface CryptoPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: UserPlan;
    amount: number;
    onSuccess: () => void;
}

export const CryptoPaymentModal: React.FC<CryptoPaymentModalProps> = ({ isOpen, onClose, plan, amount, onSuccess }) => {
    const [step, setStep] = useState<'select' | 'payment' | 'verifying' | 'success'>('select');
    const [selectedCoin, setSelectedCoin] = useState<keyof typeof CRYPTO_CONFIG | null>(null);

    // Reset state on open
    useEffect(() => {
        if(isOpen) {
            setStep('select');
            setSelectedCoin(null);
        }
    }, [isOpen]);

    const handleSelectCoin = (coin: keyof typeof CRYPTO_CONFIG) => {
        setSelectedCoin(coin);
        setStep('payment');
    };

    const handlePaymentSent = () => {
        setStep('verifying');
        // Backend Simulation: Wait for simulated blockchain confirmation
        setTimeout(() => {
            setStep('success');
            // Wait a moment to show success state before closing/redirecting
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 2000);
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={step === 'success' ? 'Payment Successful!' : `Upgrade to ${plan} Plan`}
        >
            <div className="min-h-[300px] flex flex-col">
                {step === 'select' && (
                    <>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Select a cryptocurrency to pay <strong>${amount}</strong>. 
                            <br/><span className="text-xs text-gray-400">Coins (credits) will be allocated instantly upon confirmation.</span>
                        </p>
                        <div className="space-y-3">
                            {(Object.keys(CRYPTO_CONFIG) as Array<keyof typeof CRYPTO_CONFIG>).map((key) => (
                                <button 
                                    key={key}
                                    onClick={() => handleSelectCoin(key)}
                                    className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300 text-xs">
                                            {CRYPTO_CONFIG[key].symbol}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-gray-900 dark:text-white">{CRYPTO_CONFIG[key].name}</div>
                                            <div className="text-xs text-gray-500">{CRYPTO_CONFIG[key].network}</div>
                                        </div>
                                    </div>
                                    <i className="fa-solid fa-chevron-right text-gray-400"></i>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {step === 'payment' && selectedCoin && (
                    <div className="flex flex-col h-full">
                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Send exactly</p>
                            <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-2">
                                {selectedCoin === 'ETH' ? '0.012' : selectedCoin === 'BTC' ? '0.0008' : '0.45'} {selectedCoin}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">to the address below</p>
                        </div>

                        <div className="bg-gray-100 dark:bg-slate-900 p-4 rounded-lg mb-6 break-all font-mono text-xs md:text-sm text-center border border-gray-200 dark:border-slate-700 relative group cursor-pointer" onClick={() => navigator.clipboard.writeText(CRYPTO_CONFIG[selectedCoin].address)}>
                            {CRYPTO_CONFIG[selectedCoin].address}
                            <div className="absolute inset-0 bg-black/50 items-center justify-center hidden group-hover:flex rounded-lg text-white font-bold">
                                Copy Address
                            </div>
                        </div>

                        {/* QR Placeholder */}
                        <div className="flex-grow flex items-center justify-center mb-6">
                            <div className="w-32 h-32 bg-white p-2 rounded-lg">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${CRYPTO_CONFIG[selectedCoin].address}`} alt="QR Code" className="w-full h-full" />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-auto">
                            <Button variant="ghost" className="flex-1" onClick={() => setStep('select')}>Back</Button>
                            <Button className="flex-1" onClick={handlePaymentSent}>I Have Sent It</Button>
                        </div>
                    </div>
                )}

                {step === 'verifying' && (
                    <div className="flex flex-col items-center justify-center h-full py-12">
                        <div className="animate-spin-slow text-6xl text-indigo-500 mb-6">
                            <i className="fa-solid fa-circle-notch"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Verifying Transaction</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
                            Please wait while we confirm your transaction on the blockchain. This usually takes 10-30 seconds.
                        </p>
                        <div className="mt-8 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs rounded border border-yellow-100 dark:border-yellow-900">
                            <i className="fa-solid fa-server mr-2"></i>
                            <strong>Backend Simulation:</strong> Listening for webhook...
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="flex flex-col items-center justify-center h-full py-12">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-3xl mb-6 animate-bounce">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Payment Confirmed!</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                            Your plan has been upgraded and coins have been allocated to your account.
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

// Tour Component
export const Tour: React.FC = () => {
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem('tour_completed');
        if (!completed) {
            // Delay slightly to allow app to load
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNext = () => setStep(prev => prev + 1);
    const handleSkip = () => {
        setIsVisible(false);
        localStorage.setItem('tour_completed', 'true');
    };
    const handleFinish = () => {
        setIsVisible(false);
        localStorage.setItem('tour_completed', 'true');
    };

    if (!isVisible) return null;

    const tourSteps = [
        {
            title: "Welcome to SoloAutomator",
            content: "Your all-in-one platform for startup automation. Let's take a quick tour to get you started.",
            icon: "fa-robot"
        },
        {
            title: "Explore the Library",
            content: "Browse our curated collection of startup ideas, automation workflows, and AI tools. Some items are free, while premium items require a Pro plan.",
            icon: "fa-book-open"
        },
        {
            title: "AI Power Tools",
            content: "Use our specialized AI tools to generate cold emails, ad copy, and business ideas instantly using your credits.",
            icon: "fa-wand-magic-sparkles"
        },
        {
            title: "Dark Mode",
            content: "Prefer a darker look? Toggle the theme using the moon icon in the navigation bar.",
            icon: "fa-moon"
        }
    ];

    const currentStepData = tourSteps[step];
    const isLastStep = step === tourSteps.length - 1;

    return createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center sm:items-end sm:justify-end sm:p-6 pointer-events-none">
            <div className="absolute inset-0 bg-black/20 dark:bg-black/50 pointer-events-auto backdrop-blur-sm" onClick={handleSkip}></div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 w-full max-w-sm relative z-10 pointer-events-auto m-4 animate-float-slow">
                <button onClick={handleSkip} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <i className={`fa-solid ${currentStepData.icon} text-lg`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{currentStepData.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                    {currentStepData.content}
                </p>
                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        {tourSteps.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-indigo-600' : 'w-1.5 bg-gray-300 dark:bg-slate-600'}`}></div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {step > 0 && (
                            <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)}>Back</Button>
                        )}
                        <Button size="sm" onClick={isLastStep ? handleFinish : handleNext}>
                            {isLastStep ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};