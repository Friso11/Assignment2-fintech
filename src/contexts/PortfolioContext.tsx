import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PortfolioAsset } from '../types/portfolio';

interface PortfolioContextType {
  portfolioData: PortfolioAsset[];
  setPortfolioData: (data: PortfolioAsset[]) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioAsset[]>([]);

  return (
    <PortfolioContext.Provider value={{ portfolioData, setPortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};