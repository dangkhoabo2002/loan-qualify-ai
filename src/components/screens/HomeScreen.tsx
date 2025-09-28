import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Shield, TrendingUp, Users } from 'lucide-react';

interface HomeScreenProps {
  onStartCheck: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartCheck }) => {
  return (
    <div className="min-h-screen p-4 gradient-hero">
      {/* Header */}
      <div className="pt-12 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/10 rounded-2xl backdrop-blur-sm">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Home Loan Eligibility
        </h1>
        <p className="text-white/80 text-sm">
          Check your eligibility in seconds
        </p>
      </div>

      {/* Main Card */}
      <Card className="banking-card p-6 mb-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Ready to buy your dream home?
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter your National ID to check if you qualify for a home loan
          </p>
        </div>

        <Button 
          onClick={onStartCheck}
          className="w-full gradient-primary text-white font-medium py-6 text-base rounded-xl shadow-medium hover:shadow-large transition-all duration-200"
        >
          Check Eligibility Now
        </Button>
      </Card>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-white font-medium text-center mb-4">
          Why check with us?
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Secure & Private</p>
              <p className="text-white/70 text-xs">Your data is protected</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Instant Results</p>
              <p className="text-white/70 text-xs">Get answer in seconds</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Trusted by thousands</p>
              <p className="text-white/70 text-xs">Join satisfied customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};