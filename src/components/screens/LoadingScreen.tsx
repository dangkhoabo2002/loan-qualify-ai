import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Database, Shield, TrendingUp, CheckCircle } from 'lucide-react';

const steps = [
  { icon: Database, label: 'Retrieving personal information', duration: 1000 },
  { icon: Shield, label: 'Checking criminal records', duration: 800 },
  { icon: TrendingUp, label: 'Verifying credit score', duration: 1200 },
  { icon: CheckCircle, label: 'Processing eligibility', duration: 1000 }
];

export const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) return;

      const step = steps[stepIndex];
      const stepProgress = (stepIndex / steps.length) * 100;
      
      // Update progress gradually
      const progressIncrement = 25 / (step.duration / 50); // 25% per step
      let currentProgress = stepProgress;
      
      progressTimer = setInterval(() => {
        currentProgress += progressIncrement;
        if (currentProgress >= stepProgress + 25) {
          currentProgress = stepProgress + 25;
          clearInterval(progressTimer);
        }
        setProgress(Math.min(currentProgress, 100));
      }, 50);

      stepTimer = setTimeout(() => {
        setCurrentStep(stepIndex + 1);
        runStep(stepIndex + 1);
      }, step.duration);
    };

    runStep(0);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="min-h-screen p-4 bg-background flex items-center justify-center">
      <Card className="banking-card p-6 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-2xl">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Checking Eligibility</h2>
          <p className="text-muted-foreground text-sm">
            Please wait while we verify your information
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground text-center">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={index}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 border border-primary/20' 
                    : isCompleted 
                    ? 'bg-success/10 border border-success/20' 
                    : 'bg-muted/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  isActive 
                    ? 'bg-primary/20' 
                    : isCompleted 
                    ? 'bg-success/20' 
                    : 'bg-muted'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <Icon className={`w-4 h-4 ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    isActive 
                      ? 'text-primary' 
                      : isCompleted 
                      ? 'text-success' 
                      : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </p>
                </div>
                {isActive && (
                  <div className="status-indicator bg-primary" />
                )}
                {isCompleted && (
                  <div className="w-3 h-3 bg-success rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-xl">
          <p className="text-xs text-muted-foreground text-center">
            We're securely checking multiple databases to provide you with an accurate assessment
          </p>
        </div>
      </Card>
    </div>
  );
};