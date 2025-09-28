import React, { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { IDInputScreen } from './screens/IDInputScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { ResultScreen } from './screens/ResultScreen';
import { ErrorScreen } from './screens/ErrorScreen';

export type Screen = 'home' | 'input' | 'loading' | 'result' | 'error';

export interface EligibilityResult {
  eligible: boolean;
  reasons?: string[];
  personalInfo?: {
    firstName: string;
    lastName: string;
    age: number;
  };
}

interface EligibilityCheckerProps {
  onBackToMenu?: () => void;
}

const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({ onBackToMenu }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [nationalId, setNationalId] = useState('');
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleStartCheck = () => {
    setCurrentScreen('input');
  };

  const handleSubmitID = async (id: string) => {
    setNationalId(id);
    setCurrentScreen('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock eligibility check based on ID
      const isEligible = Math.random() > 0.3; // 70% eligible for demo
      
      setResult({
        eligible: isEligible,
        personalInfo: {
          firstName: 'Nguyễn Văn',
          lastName: 'An',
          age: 32
        },
        reasons: isEligible ? [] : ['Credit score below minimum requirement', 'Insufficient income verification']
      });
      
      setCurrentScreen('result');
    } catch (err) {
      setError('Service temporarily unavailable. Please try again later.');
      setCurrentScreen('error');
    }
  };

  const handleBack = () => {
    if (currentScreen === 'input') {
      setCurrentScreen('home');
    } else if (currentScreen === 'result' || currentScreen === 'error') {
      if (onBackToMenu) {
        onBackToMenu();
      } else {
        setCurrentScreen('home');
        setResult(null);
        setError('');
        setNationalId('');
      }
    }
  };

  const handleRetry = () => {
    if (nationalId) {
      handleSubmitID(nationalId);
    } else {
      setCurrentScreen('input');
    }
  };

  return (
    <div className="mobile-container">
      {currentScreen === 'home' && (
        <HomeScreen onStartCheck={handleStartCheck} />
      )}
      
      {currentScreen === 'input' && (
        <IDInputScreen onSubmit={handleSubmitID} onBack={handleBack} />
      )}
      
      {currentScreen === 'loading' && (
        <LoadingScreen />
      )}
      
      {currentScreen === 'result' && result && (
        <ResultScreen result={result} onBack={handleBack} />
      )}
      
      {currentScreen === 'error' && (
        <ErrorScreen error={error} onRetry={handleRetry} onBack={handleBack} />
      )}
    </div>
  );
};

export default EligibilityChecker;