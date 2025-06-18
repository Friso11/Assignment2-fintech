import { PortfolioAsset, AssetTER, BrokerFee } from '../types/portfolio';

// Broker fee database (2024 European rates)
export const brokerFees: Record<string, BrokerFee> = {
  'DEGIRO': {
    name: 'DEGIRO',
    fxMarkup: 0.0025,
    tradingFee: 2.00,
    platformFee: 0,
    minTer: 0.0007,
    maxTer: 0.0150
  },
  'Degiro': {
    name: 'Degiro',
    fxMarkup: 0.0025,
    tradingFee: 2.00,
    platformFee: 0,
    minTer: 0.0007,
    maxTer: 0.0150
  },
  'BUX': {
    name: 'BUX',
    fxMarkup: 0.0050,
    tradingFee: 0,
    platformFee: 2.99,
    minTer: 0.0025,
    maxTer: 0.0075
  },
  'Trade Republic': {
    name: 'Trade Republic',
    fxMarkup: 0.0015,
    tradingFee: 1.00,
    platformFee: 0,
    minTer: 0.0007,
    maxTer: 0.0070
  },
  'Interactive Brokers': {
    name: 'Interactive Brokers',
    fxMarkup: 0.0002,
    tradingFee: 2.00,
    platformFee: 0,
    minTer: 0.0007,
    maxTer: 0.0150
  },
  'Robinhood': {
    name: 'Robinhood',
    fxMarkup: 0.0030,
    tradingFee: 0,
    platformFee: 0,
    minTer: 0.0000,
    maxTer: 0.0100
  },
  'Vanguard': {
    name: 'Vanguard',
    fxMarkup: 0.0015,
    tradingFee: 0,
    platformFee: 0,
    minTer: 0.0003,
    maxTer: 0.0080
  },
  'Fidelity': {
    name: 'Fidelity',
    fxMarkup: 0.0020,
    tradingFee: 0,
    platformFee: 0,
    minTer: 0.0000,
    maxTer: 0.0090
  },
  'Charles Schwab': {
    name: 'Charles Schwab',
    fxMarkup: 0.0018,
    tradingFee: 0,
    platformFee: 0,
    minTer: 0.0003,
    maxTer: 0.0085
  },
  'eToro': {
    name: 'eToro',
    fxMarkup: 0.0050,
    tradingFee: 0,
    platformFee: 5.00,
    minTer: 0.0000,
    maxTer: 0.0120
  },
  'Saxo Bank': {
    name: 'Saxo Bank',
    fxMarkup: 0.0025,
    tradingFee: 3.00,
    platformFee: 0,
    minTer: 0.0005,
    maxTer: 0.0150
  },
  'Scalable Capital': {
    name: 'Scalable Capital',
    fxMarkup: 0.0020,
    tradingFee: 0.99,
    platformFee: 2.99,
    minTer: 0.0007,
    maxTer: 0.0080
  },
  'DEFAULT': {
    name: 'Other',
    fxMarkup: 0.0020,
    tradingFee: 5.00,
    platformFee: 0,
    minTer: 0.0020,
    maxTer: 0.0150
  }
};

// Total Expense Ratio (TER) dictionary for various assets
const terDictionary: AssetTER = {
  // Popular ETFs
  'VWCE': { ter: 0.0022, type: 'ETF' },
  'IWDA': { ter: 0.0020, type: 'ETF' },
  'EUNL': { ter: 0.0020, type: 'ETF' },
  'VUSA': { ter: 0.0007, type: 'ETF' },
  'CSPX': { ter: 0.0007, type: 'ETF' },
  'MEUD': { ter: 0.0012, type: 'ETF' },
  'VEUR': { ter: 0.0012, type: 'ETF' },
  'IEMA': { ter: 0.0018, type: 'ETF' },
  'VFEM': { ter: 0.0022, type: 'ETF' },
  'AGGH': { ter: 0.0010, type: 'ETF' },
  'IUSQ': { ter: 0.0007, type: 'ETF' },
  'HMWO': { ter: 0.0015, type: 'ETF' },
  'SAWD': { ter: 0.0019, type: 'ETF' },
  'DBXW': { ter: 0.0019, type: 'ETF' },
  'XDWD': { ter: 0.0019, type: 'ETF' },
  'TRET.L': { ter: 0.0015, type: 'ETF' },
  
  // Stocks (no TER)
  'AAPL': { ter: 0.0000, type: 'STOCK' },
  'MSFT': { ter: 0.0000, type: 'STOCK' },
  'GOOGL': { ter: 0.0000, type: 'STOCK' },
  'AMZN': { ter: 0.0000, type: 'STOCK' },
  'TSLA': { ter: 0.0000, type: 'STOCK' },
  'FB': { ter: 0.0000, type: 'STOCK' },
  'NVDA': { ter: 0.0000, type: 'STOCK' },
  'BRK.B': { ter: 0.0000, type: 'STOCK' },
  'JPM': { ter: 0.0000, type: 'STOCK' },
  'JNJ': { ter: 0.0000, type: 'STOCK' },
  'V': { ter: 0.0000, type: 'STOCK' },
  'PG': { ter: 0.0000, type: 'STOCK' },
  'UNH': { ter: 0.0000, type: 'STOCK' },
  'HD': { ter: 0.0000, type: 'STOCK' },
  'BAC': { ter: 0.0000, type: 'STOCK' },
  'MA': { ter: 0.0000, type: 'STOCK' },
  'DIS': { ter: 0.0000, type: 'STOCK' },
  'PYPL': { ter: 0.0000, type: 'STOCK' },
  'CMCSA': { ter: 0.0000, type: 'STOCK' },
  'XOM': { ter: 0.0000, type: 'STOCK' },
  
  // Mutual Funds (higher TER)
  'FCNTX': { ter: 0.0082, type: 'FUND' },
  'PRGFX': { ter: 0.0065, type: 'FUND' },
  'VFIAX': { ter: 0.0040, type: 'FUND' },
  'VTSMX': { ter: 0.0140, type: 'FUND' },
  'VTSAX': { ter: 0.0030, type: 'FUND' },
  'VTIAX': { ter: 0.0011, type: 'FUND' },
  'AGTHX': { ter: 0.0068, type: 'FUND' },
  'AIVSX': { ter: 0.0075, type: 'FUND' },
  'ANCFX': { ter: 0.0095, type: 'FUND' },
  'CWGIX': { ter: 0.0110, type: 'FUND' },
  
  // Defaults by type
  'DEFAULT_ETF': { ter: 0.0030, type: 'ETF' },
  'DEFAULT_STOCK': { ter: 0.0000, type: 'STOCK' },
  'DEFAULT_FUND': { ter: 0.0120, type: 'FUND' }
};

// Map to suggest alternative assets for high-fee investments
const assetSuggestions: Record<string, string> = {
  'FCNTX': 'Switch to VFIAX (TER 0.40%)',
  'PRGFX': 'Switch to VWCE (TER 0.22%)',
  'VTSMX': 'Switch to VUSA (TER 0.07%)',
  'AGTHX': 'Switch to VWCE (TER 0.22%)',
  'AIVSX': 'Switch to IWDA (TER 0.20%)',
  'ANCFX': 'Switch to VWCE (TER 0.22%)',
  'CWGIX': 'Switch to VWCE (TER 0.22%)',
  'DEFAULT_HIGH_COST': 'Consider switching to a low-cost ETF like VWCE (TER 0.22%)'
};

export const calculatePortfolioCosts = (portfolio: PortfolioAsset[]): PortfolioAsset[] => {
  return portfolio.map(asset => {
    // Get broker fees
    const brokerData = getBrokerFees(asset.broker);
    
    // Get TER and asset type
    const { ter, type } = getAssetTER(asset.asset);
    
    // Calculate costs
    const terCost = asset.amount * ter;
    const fxCost = asset.amount * brokerData.fxMarkup;
    const platformFeeCost = brokerData.platformFee * 12; // Annual platform fee
    const totalCost = terCost + fxCost + brokerData.tradingFee + platformFeeCost;
    const costPercent = (totalCost / asset.amount) * 100;
    
    // Generate suggestion
    const suggestion = generateSuggestion(asset.asset, ter, type, costPercent);
    
    // Calculate total value if market price is available
    const totalValue = asset.marketPrice ? asset.amount * asset.marketPrice : asset.amount;
    
    return {
      ...asset,
      ter,
      fxMarkup: brokerData.fxMarkup,
      tradingFee: brokerData.tradingFee,
      platformFee: platformFeeCost,
      estimatedCost: totalCost,
      costPercent,
      suggestion,
      totalValue
    };
  });
};

const getBrokerFees = (broker: string): BrokerFee => {
  // Normalize broker name for lookup
  const normalizedBroker = Object.keys(brokerFees).find(
    key => key.toLowerCase() === broker.toLowerCase()
  );
  
  return brokerFees[normalizedBroker || 'DEFAULT'] || brokerFees['DEFAULT'];
};

const getAssetTER = (asset: string): { ter: number; type: 'ETF' | 'STOCK' | 'FUND' } => {
  // Direct lookup first
  if (terDictionary[asset]) {
    return terDictionary[asset];
  }
  
  // Check for ETF patterns
  if (asset.includes('ETF') || etfAssets.some(etf => asset.toUpperCase().includes(etf.toUpperCase()))) {
    return terDictionary['DEFAULT_ETF'];
  }
  
  // Check for mutual fund patterns
  if (mutualFundAssets.some(fund => asset.toUpperCase().includes(fund.toUpperCase()))) {
    return terDictionary['DEFAULT_FUND'];
  }
  
  // Default to stock (no TER)
  return terDictionary['DEFAULT_STOCK'];
};

const generateSuggestion = (asset: string, ter: number, type: string, costPercent: number): string => {
  // Check for specific asset suggestions
  if (assetSuggestions[asset]) {
    return assetSuggestions[asset];
  }
  
  // High cost threshold suggestions
  if (costPercent > 1.0) { // If total cost > 1%
    if (type === 'ETF') {
      return 'Switch to VWCE (TER 0.22%)';
    } else if (type === 'FUND') {
      return assetSuggestions['DEFAULT_HIGH_COST'];
    }
  } else if (ter > 0.008) { // If TER > 0.8%
    if (type === 'ETF') {
      return 'Consider VWCE (TER 0.22%)';
    } else if (type === 'FUND') {
      return 'Consider low-cost ETF alternative';
    }
  }
  
  return 'Hold';
};

// Lists to check if an asset is an ETF or mutual fund
const etfAssets = ['ETF', 'UCITS', 'Index', 'SPDR', 'iShares', 'Vanguard'];
const mutualFundAssets = ['Fund', 'Mutual', 'FCP', 'SICAV', 'OEF', 'Class'];