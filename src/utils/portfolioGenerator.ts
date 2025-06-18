import { PortfolioAsset } from '../types/portfolio';

/**
 * Portfolio Generator Utility
 * 
 * Creates realistic sample portfolios for demonstration and testing purposes.
 * Generates diversified portfolios with a mix of ETFs, stocks, and mutual funds
 * across different brokers to showcase the fee analysis capabilities.
 * 
 * Features:
 * - Realistic asset allocation (60% ETFs, 30% stocks, 10% mutual funds)
 * - Diverse broker distribution with clustering for realism
 * - Varied investment amounts based on asset type
 * - Popular real-world assets and brokers
 */

// Sample assets categorized by type for realistic portfolio generation
const stockAssets = [
  'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'FB', 'TSLA', 'NVDA', 'BRK.B', 'JPM', 'JNJ',
  'V', 'PG', 'UNH', 'HD', 'BAC', 'MA', 'DIS', 'PYPL', 'CMCSA', 'XOM'
];

const etfAssets = [
  'VWCE', 'IWDA', 'EUNL', 'VUSA', 'CSPX', 'MEUD', 'VEUR', 'IEMA', 'VFEM', 'AGGH',
  'IUSQ', 'HMWO', 'SAWD', 'DBXW', 'XDWD'
];

const mutualFundAssets = [
  'FCNTX', 'VFIAX', 'PRGFX', 'VTSAX', 'VTIAX', 'AGTHX', 'AIVSX', 'VTSMX', 'ANCFX', 'CWGIX'
];

// Popular brokers for realistic distribution
const brokers = [
  'Interactive Brokers', 'Degiro', 'Robinhood', 'Trade Republic', 'Vanguard',
  'Fidelity', 'Charles Schwab', 'eToro', 'Saxo Bank', 'Scalable Capital'
];

/**
 * Generates a realistic random portfolio for demonstration
 * 
 * Creates a diversified portfolio with:
 * - 10-15 total assets
 * - 60% ETFs (core holdings with larger amounts)
 * - 30% individual stocks (medium amounts)
 * - 10% mutual funds (varied amounts)
 * - Realistic broker distribution with some clustering
 * 
 * @returns Array of portfolio assets ready for fee analysis
 */
export const generateRandomPortfolio = (): PortfolioAsset[] => {
  const portfolio: PortfolioAsset[] = [];
  const portfolioSize = Math.floor(Math.random() * 6) + 10; // 10-15 assets
  
  // Calculate asset distribution based on realistic allocation
  const numETFs = Math.round(portfolioSize * 0.6);    // 60% ETFs
  const numStocks = Math.round(portfolioSize * 0.3);  // 30% stocks
  const numFunds = portfolioSize - numETFs - numStocks; // Remaining as funds
  
  /**
   * Selects random unique items from an array
   * 
   * @param arr - Source array
   * @param count - Number of items to select
   * @returns Array of selected items
   */
  const getRandomItems = (arr: string[], count: number) => {
    const result = [];
    const used = new Set<number>();
    
    for (let i = 0; i < count; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * arr.length);
      } while (used.has(index));
      
      used.add(index);
      result.push(arr[index]);
    }
    
    return result;
  };
  
  // Select random assets from each category
  const selectedETFs = getRandomItems(etfAssets, numETFs);
  const selectedStocks = getRandomItems(stockAssets, numStocks);
  const selectedFunds = getRandomItems(mutualFundAssets, numFunds);
  
  /**
   * Generates a random investment amount within specified range
   * 
   * @param min - Minimum amount
   * @param max - Maximum amount
   * @returns Random amount rounded to nearest euro
   */
  const generateRandomAmount = (min: number, max: number) => {
    return Math.round(min + Math.random() * (max - min));
  };
  
  /**
   * Creates a realistic broker distribution with clustering
   * Some investors tend to use 1-2 primary brokers with occasional others
   * 
   * @param count - Total number of broker assignments needed
   * @returns Array of broker names
   */
  const generateBrokerDistribution = (count: number) => {
    const selectedBrokers = [];
    
    // Select 2 primary brokers for clustering effect
    const mainBroker1 = brokers[Math.floor(Math.random() * brokers.length)];
    const mainBroker2 = brokers[Math.floor(Math.random() * brokers.length)];
    
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      if (rand < 0.4) {
        // 40% chance for primary broker
        selectedBrokers.push(mainBroker1);
      } else if (rand < 0.7) {
        // 30% chance for secondary broker
        selectedBrokers.push(mainBroker2);
      } else {
        // 30% chance for random broker
        const randomBroker = brokers[Math.floor(Math.random() * brokers.length)];
        selectedBrokers.push(randomBroker);
      }
    }
    
    return selectedBrokers;
  };
  
  const brokerDistribution = generateBrokerDistribution(portfolioSize);
  
  // Add ETFs to portfolio (typically larger core holdings)
  selectedETFs.forEach((etf) => {
    portfolio.push({
      asset: etf,
      amount: generateRandomAmount(5000, 30000),  // €5k-30k range
      broker: brokerDistribution[portfolio.length],
      estimatedCost: 0,    // Will be calculated by fee calculator
      costPercent: 0,      // Will be calculated by fee calculator
      suggestion: ''       // Will be populated by fee calculator
    });
  });
  
  // Add stocks to portfolio (medium satellite holdings)
  selectedStocks.forEach((stock) => {
    portfolio.push({
      asset: stock,
      amount: generateRandomAmount(2000, 15000),  // €2k-15k range
      broker: brokerDistribution[portfolio.length],
      estimatedCost: 0,    // Will be calculated by fee calculator
      costPercent: 0,      // Will be calculated by fee calculator
      suggestion: ''       // Will be populated by fee calculator
    });
  });
  
  // Add mutual funds to portfolio (varied amounts)
  selectedFunds.forEach((fund) => {
    portfolio.push({
      asset: fund,
      amount: generateRandomAmount(3000, 20000),  // €3k-20k range
      broker: brokerDistribution[portfolio.length],
      estimatedCost: 0,    // Will be calculated by fee calculator
      costPercent: 0,      // Will be calculated by fee calculator
      suggestion: ''       // Will be populated by fee calculator
    });
  });
  
  return portfolio;
};