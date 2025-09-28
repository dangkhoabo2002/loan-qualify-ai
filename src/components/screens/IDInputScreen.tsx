import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CreditCard, AlertCircle } from 'lucide-react';

interface IDInputScreenProps {
  onSubmit: (id: string) => void;
  onBack: () => void;
}

export const IDInputScreen: React.FC<IDInputScreenProps> = ({ onSubmit, onBack }) => {
  const [nationalId, setNationalId] = useState('');
  const [error, setError] = useState('');

  const validateNationalId = (id: string): boolean => {
    // Vietnamese CMND: 9 digits, CCCD: 12 digits
    const cleanId = id.replace(/\s/g, '');
    
    return cleanId.length === 9 || cleanId.length === 12;
  };

  const formatNationalId = (value: string): string => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format based on length (CMND: 9 digits, CCCD: 12 digits)
    if (cleaned.length <= 9) {
      // Format CMND: XXX XXX XXX
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3').trim();
    } else {
      // Format CCCD: XXXX XXXX XXXX
      return cleaned.slice(0, 12).replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3').trim();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNationalId(e.target.value);
    setNationalId(formatted);
    setError('');
  };

  const handleSubmit = () => {
    const cleanId = nationalId.replace(/\s/g, '');
    
    if (!cleanId) {
      setError('Please enter your National ID');
      return;
    }
    
    if (!validateNationalId(cleanId)) {
      setError('Please enter a valid National ID (9 or 12 digits)');
      return;
    }

    onSubmit(cleanId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

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
        <h1 className="text-lg font-semibold">Enter National ID</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Progress indicator */}
      <div className="flex mb-8">
        <div className="flex-1 h-1 bg-primary rounded-full mr-1" />
        <div className="flex-1 h-1 bg-muted rounded-full mr-1" />
        <div className="flex-1 h-1 bg-muted rounded-full" />
      </div>

      {/* Main Content */}
      <Card className="banking-card p-6 mb-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-2xl">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">National ID Verification</h2>
          <p className="text-muted-foreground text-sm">
            Enter your CMND or CCCD number to verify your identity
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              National ID Number
            </label>
            <Input
              type="text"
              value={nationalId}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your CMND/CCCD"
              className={`text-center text-lg tracking-wider ${error ? 'border-destructive' : ''}`}
              maxLength={14} // Max formatted length for CCCD
            />
            {error && (
              <div className="flex items-center mt-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </div>
            )}
          </div>

          <div className="bg-muted/50 p-4 rounded-xl">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Format:</strong> CMND (9 digits) or CCCD (12 digits)
            </p>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!nationalId}
        className="w-full gradient-primary text-white font-medium py-6 text-base rounded-xl shadow-medium hover:shadow-large transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue Verification
      </Button>

      {/* Info */}
      <div className="mt-6 p-4 bg-accent/10 rounded-xl">
        <p className="text-xs text-muted-foreground text-center">
          Your personal information is encrypted and secure. We only use it to verify your loan eligibility.
        </p>
      </div>
    </div>
  );
};