'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { ModuleKey, SchoolSubscription } from '@/lib/features';
import { MOCK_SUBSCRIPTION } from '@/lib/features';

interface FeaturesContextValue {
  subscription: SchoolSubscription;
  isEnabled: (module: ModuleKey) => boolean;
  setSubscription: (sub: SchoolSubscription) => void;
}

const FeaturesContext = createContext<FeaturesContextValue | null>(null);

export function FeaturesProvider({ children }: { children: ReactNode }) {
  // In production: fetch this from /api/me or attach it to the JWT response
  const [subscription, setSubscription] = useState<SchoolSubscription>(MOCK_SUBSCRIPTION);

  function isEnabled(module: ModuleKey): boolean {
    if (subscription.status !== 'ACTIVE') return false;
    return subscription.enabledModules.includes(module);
  }

  return (
    <FeaturesContext.Provider value={{ subscription, isEnabled, setSubscription }}>
      {children}
    </FeaturesContext.Provider>
  );
}

export function useFeatures(): FeaturesContextValue {
  const ctx = useContext(FeaturesContext);
  if (!ctx) throw new Error('useFeatures must be used inside FeaturesProvider');
  return ctx;
}
