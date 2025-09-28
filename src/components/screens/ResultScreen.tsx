import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, User, ArrowLeft, Phone } from 'lucide-react';
import { EligibilityResult } from '../EligibilityChecker';

interface ResultScreenProps {
  result: EligibilityResult;
  onBack: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onBack }) => {
  const { eligible, reasons, personalInfo } = result;

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
        <h1 className="text-lg font-semibold">Eligibility Results</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Progress indicator - completed */}
      <div className="flex mb-8">
        <div className="flex-1 h-1 bg-success rounded-full mr-1" />
        <div className="flex-1 h-1 bg-success rounded-full mr-1" />
        <div className="flex-1 h-1 bg-success rounded-full" />
      </div>

      {/* Result Card */}
      <Card className={`banking-card p-6 mb-6 ${
        eligible ? 'border-success/20 bg-success/5' : 'border-warning/20 bg-warning/5'
      }`}>
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-20 h-20 mb-4 rounded-2xl ${
            eligible ? 'bg-success/10' : 'bg-warning/10'
          }`}>
            {eligible ? (
              <CheckCircle className="w-10 h-10 text-success" />
            ) : (
              <XCircle className="w-10 h-10 text-warning" />
            )}
          </div>
          
          <Badge 
            className={`mb-4 px-4 py-2 text-sm font-medium ${
              eligible 
                ? 'bg-success text-success-foreground' 
                : 'bg-warning text-warning-foreground'
            }`}
          >
            {eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
          </Badge>
          
          <h2 className="text-xl font-semibold mb-2">
            {eligible 
              ? 'Congratulations! You qualify for a home loan' 
              : 'Sorry, you don\'t qualify at this time'
            }
          </h2>
          
          <p className="text-muted-foreground text-sm">
            {eligible 
              ? 'Based on our assessment, you meet the requirements for our home loan program.'
              : 'Don\'t worry, there are steps you can take to improve your eligibility.'
            }
          </p>
        </div>

        {/* Personal Info */}
        {personalInfo && (
          <div className="bg-muted/30 p-4 rounded-xl mb-4">
            <div className="flex items-center mb-3">
              <User className="w-4 h-4 text-muted-foreground mr-2" />
              <span className="text-sm font-medium">Personal Information</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>
                <p className="font-medium">{personalInfo.firstName} {personalInfo.lastName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Age:</span>
                <p className="font-medium">{personalInfo.age} years</p>
              </div>
            </div>
          </div>
        )}

        {/* Reasons for rejection */}
        {!eligible && reasons && reasons.length > 0 && (
          <div className="bg-warning/10 p-4 rounded-xl mb-4">
            <h3 className="text-sm font-medium mb-3 text-warning-foreground">
              Reasons for rejection:
            </h3>
            <ul className="space-y-2">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start text-sm">
                  <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        {eligible ? (
          <Button className="w-full gradient-success text-white font-medium py-6 text-base rounded-xl shadow-medium hover:shadow-large transition-all duration-200">
            Apply for Home Loan
          </Button>
        ) : (
          <Button className="w-full gradient-primary text-white font-medium py-6 text-base rounded-xl shadow-medium hover:shadow-large transition-all duration-200">
            Get Pre-Approval Tips
          </Button>
        )}
        
        <Button 
          variant="outline" 
          className="w-full py-6 text-base rounded-xl"
          onClick={onBack}
        >
          Check Another ID
        </Button>
      </div>

      {/* Contact Support */}
      <div className="mt-6 p-4 bg-accent/10 rounded-xl">
        <div className="flex items-center justify-center">
          <Phone className="w-4 h-4 text-accent mr-2" />
          <p className="text-sm text-muted-foreground">
            Need help? Contact our loan specialists at{' '}
            <span className="font-medium text-foreground">1800-LOAN-HELP</span>
          </p>
        </div>
      </div>
    </div>
  );
};