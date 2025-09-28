import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, ArrowLeft, Phone } from 'lucide-react';

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
  onBack: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry, onBack }) => {
  return (
    <div className="min-h-screen p-4 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">System Error</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Progress indicator - error state */}
      <div className="flex mb-8">
        <div className="flex-1 h-1 bg-primary rounded-full mr-1" />
        <div className="flex-1 h-1 bg-destructive rounded-full mr-1" />
        <div className="flex-1 h-1 bg-muted rounded-full" />
      </div>

      {/* Error Card */}
      <Card className="banking-card p-6 mb-6 border-destructive/20 bg-destructive/5">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-destructive/10 rounded-2xl">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2 text-destructive">
            Unable to Process Request
          </h2>
          
          <p className="text-muted-foreground text-sm mb-4">
            We're experiencing technical difficulties and couldn't complete your eligibility check.
          </p>

          <div className="bg-destructive/10 p-4 rounded-xl text-left">
            <h3 className="text-sm font-medium mb-2 text-destructive">Error Details:</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </Card>

      {/* Troubleshooting Tips */}
      <Card className="banking-card p-4 mb-6">
        <h3 className="text-sm font-medium mb-3">What you can try:</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
            Check your internet connection
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
            Try again in a few minutes
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
            Contact support if the issue persists
          </li>
        </ul>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onRetry}
          className="w-full gradient-primary text-white font-medium py-6 text-base rounded-xl shadow-medium hover:shadow-large transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full py-6 text-base rounded-xl"
          onClick={onBack}
        >
          Start Over
        </Button>
      </div>

      {/* Contact Support */}
      <div className="mt-6 p-4 bg-accent/10 rounded-xl">
        <div className="text-center">
          <Phone className="w-4 h-4 text-accent mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-1">
            Need immediate assistance?
          </p>
          <p className="text-sm font-medium text-foreground">
            Call us at 1800-TECH-HELP
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Available 24/7 for technical support
          </p>
        </div>
      </div>
    </div>
  );
};