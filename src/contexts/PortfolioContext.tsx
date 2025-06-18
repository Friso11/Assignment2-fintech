import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PortfolioAsset } from '../types/portfolio';

/**
 * Portfolio Context
 * 
 * Provides global state management for portfolio data across the application.
 * This context allows components to access and modify portfolio data without
 * prop drilling, ensuring consistent data flow throughout the app.
 * 
 * Features:
 * - Centralized portfolio data storage
 * - Type-safe context with TypeScript
 * - Easy data sharing between components
 * - Automatic re-rendering when data changes
 */

interface PortfolioContextType {
  portfolioData: PortfolioAsset[];
  setPortfolioData: (data: PortfolioAsset[]) => void;
}

// Create the context with undefined default to enforce provider usage
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

interface PortfolioProviderProps {
  children: ReactNode;
}

/**
 * Portfolio Provider Component
 * 
 * Wraps the application to provide portfolio data context to all child components.
 * Should be placed at the root level of the app to ensure all components have access.
 * 
 * @param children - Child components that need access to portfolio data
 */
export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  // State to hold the current portfolio data
  const [portfolioData, setPortfolioData] = useState<PortfolioAsset[]>([]);

  return (
    <PortfolioContext.Provider value={{ portfolioData, setPortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

/**
 * Custom hook to use Portfolio Context
 * 
 * Provides a convenient way to access portfolio data and setter function.
 * Includes error handling to ensure the hook is used within a provider.
 * 
 * @returns PortfolioContextType - Object containing portfolio data and setter
 * @throws Error if used outside of PortfolioProvider
 */
export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  
  return context;
};