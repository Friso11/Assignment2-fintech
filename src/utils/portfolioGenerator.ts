import { PortfolioAsset } from '../types/portfolio';

// Sample assets by type
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

// Sample brokers
const brokers = [
  'Interactive Brokers', 'Degiro', 'Robinhood', 'Trade Republic', 'Vanguard',
  'Fidelity', 'Charles Schwab', 'eToro', 'Saxo Bank', 'Scalable Capital'
];

export const generateRandomPortfolio = (): PortfolioAsset[] => {
  const portfolio: PortfolioAsset[] = [];
  const portfolioSize = Math.floor(Math.random() * 6) + 10; // 10-15 assets
  
  // Generate a mix of assets (60% ETFs, 30% stocks, 10% mutual funds)
  const numETFs = Math.round(portfolioSize * 0.6);
  const numStocks = Math.round(portfolioSize * 0.3);
  const numFunds = portfolioSize - numETFs - numStocks;
  
  // Helper to get random items from an array
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
  
  // Generate random ETFs
  const selectedETFs = getRandomItems(etfAssets, numETFs);
  const selectedStocks = getRandomItems(stockAssets, numStocks);
  const selectedFunds = getRandomItems(mutualFundAssets, numFunds);
  
  // Helper to generate a random amount
  const generateRandomAmount = (min: number, max: number) => {
    return Math.round(min + Math.random() * (max - min));
  };
  
  // Generate a random broker selection that's a bit weighted (to create clusters)
  const generateBrokerDistribution = (count: number) => {
    const selectedBrokers = [];
    const mainBroker1 = brokers[Math.floor(Math.random() * brokers.length)];
    const mainBroker2 = brokers[Math.floor(Math.random() * brokers.length)];
    
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      if (rand < 0.4) {
        selectedBrokers.push(mainBroker1);
      } else if (rand < 0.7) {
        selectedBrokers.push(mainBroker2);
      } else {
        const randomBroker = brokers[Math.floor(Math.random() * brokers.length)];
        selectedBrokers.push(randomBroker);
      }
    }
    
    return selectedBrokers;
  };
  
  const brokerDistribution = generateBrokerDistribution(portfolioSize);
  
  // Add ETFs to portfolio (typically larger amounts)
  selectedETFs.forEach((etf, index) => {
    portfolio.push({
      asset: etf,
      amount: generateRandomAmount(5000, 30000),
      broker: brokerDistribution[portfolio.length],
      estimatedCost: 0, // Will be calculated later
      costPercent: 0,   // Will be calculated later
      suggestion: ''    // Will be populated later
    });
  });
  
  // Add stocks to portfolio (medium amounts)
  selectedStocks.forEach((stock, index) => {
    portfolio.push({
      asset: stock,
      amount: generateRandomAmount(2000, 15000),
      broker: brokerDistribution[portfolio.length],
      estimatedCost: 0, // Will be calculated later
      costPercent: 0,   // Will be calculated later
      suggestion: ''    // Will be populated later
    });
  });
  
  // Add mutual funds to portfolio (varied amounts)
  selectedFunds.forEach((fund, index) => {
    portfolio.push({
      asset: fund,
      amount: generateRandomAmount(3000, 20000),
      broker: brokerDistribution[portfolio.length],
      estimatedCost: 0, // Will be calculated later
      costPercent: 0,   // Will be calculated later
      suggestion: ''    // Will be populated later
    });
  });
  
  return portfolio;
};