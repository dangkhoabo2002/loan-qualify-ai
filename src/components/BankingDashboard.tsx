import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  CreditCard, 
  PiggyBank, 
  Calculator,
  FileText,
  Users,
  ChevronRight,
  Bell,
  Settings
} from 'lucide-react';
import EligibilityChecker from './EligibilityChecker';

type Feature = 'menu' | 'loan-eligibility' | 'loan-calculator' | 'account-opening' | 'credit-card' | 'savings' | 'investment';

const BankingDashboard = () => {
  const [currentFeature, setCurrentFeature] = useState<Feature>('menu');

  const bankingFeatures = [
    {
      id: 'loan-eligibility' as Feature,
      title: 'Home Loan Eligibility',
      description: 'Check if you qualify for a home loan',
      icon: Home,
      color: 'bg-primary/10',
      iconColor: 'text-primary',
      available: true
    },
    {
      id: 'loan-calculator' as Feature,
      title: 'Loan Calculator',
      description: 'Calculate monthly payments',
      icon: Calculator,
      color: 'bg-secondary/10',
      iconColor: 'text-secondary',
      available: false
    },
    {
      id: 'credit-card' as Feature,
      title: 'Credit Card Application',
      description: 'Apply for a new credit card',
      icon: CreditCard,
      color: 'bg-accent/10',
      iconColor: 'text-accent',
      available: false
    },
    {
      id: 'account-opening' as Feature,
      title: 'Open Account',
      description: 'Open a new savings account',
      icon: PiggyBank,
      color: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      available: false
    },
    {
      id: 'savings' as Feature,
      title: 'Savings Plans',
      description: 'Explore savings products',
      icon: FileText,
      color: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      available: false
    },
    {
      id: 'investment' as Feature,
      title: 'Investment Advisory',
      description: 'Get investment guidance',
      icon: Users,
      color: 'bg-purple-500/10',
      iconColor: 'text-purple-600',
      available: false
    }
  ];

  const handleFeatureSelect = (featureId: Feature) => {
    if (featureId === 'loan-eligibility') {
      setCurrentFeature(featureId);
    }
  };

  const handleBackToMenu = () => {
    setCurrentFeature('menu');
  };

  if (currentFeature === 'loan-eligibility') {
    return <EligibilityChecker onBackToMenu={handleBackToMenu} />;
  }

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="bg-gradient-primary text-black p-4 pb-8">
        <div className="flex items-center justify-between mb-6 pt-8">
          <div>
            <h1 className="text-2xl font-bold">A BANK</h1>
            <p className="text-black/80 text-sm">Digital Banking Services</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="ghost" size="sm" className="text-black hover:bg-white/10 p-2 rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-black hover:bg-white/10 p-2 rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">Welcome back!</h2>
          <p className="text-black/80 text-sm">
            Complete your banking needs with our digital services
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="p-4 -mt-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Banking Services</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {bankingFeatures.map((feature) => {
            const IconComponent = feature.icon;
            
            return (
              <Card 
                key={feature.id}
                className={`banking-card p-4 transition-all duration-200 ${
                  feature.available 
                    ? 'hover:shadow-medium cursor-pointer' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => feature.available && handleFeatureSelect(feature.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${feature.color} p-3 rounded-2xl`}>
                      <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                      {!feature.available && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full inline-block mt-1">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {feature.available && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-1"
              disabled
            >
              <FileText className="w-5 h-5" />
              <span className="text-sm">Statements</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-1"
              disabled
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Payments</span>
            </Button>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 p-4 bg-accent/10 rounded-xl">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Need help with banking services?
            </p>
            <p className="text-sm font-medium text-foreground">
              Call 1800-VIET-BANK (24/7)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingDashboard;