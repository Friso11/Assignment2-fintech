import { PortfolioAsset, AssetTER, BrokerFee } from '../types/portfolio';

/**
 * Fee Calculator Utility
 * 
 * This module contains the core logic for calculating investment fees across
 * different brokers and asset types. It includes comprehensive databases of
 * broker fees and asset expense ratios, along with intelligent suggestion
 * algorithms for portfolio optimization.
 * 
 * Key Features:
 * - Comprehensive broker fee database with 2024 European rates
 * - Extensive TER (Total Expense Ratio) dictionary for popular assets
 * - Intelligent asset categorization (ETF, Stock, Mutual Fund)
 * - Smart optimization suggestions based on cost analysis
 * - Support for multiple fee types (TER, FX markup, trading, platform)
 */

// Comprehensive broker fee database (2024 European rates)
export const brokerFees: Record<string, BrokerFee> = {
  'DEGIRO': {
    name: 'DEGIRO',
    fxMarkup: 0.0025,      // 0.25% FX markup
    tradingFee: 2.00,      // €2 per trade
    platformFee: 0,        // No annual platform fee
    minTer: 0.0007,        // Minimum TER for assets
    maxTer: 0.0150         // Maximum TER for assets
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
    fxMarkup: 0.0050,      // Higher FX markup
    tradingFee: 0,         // Commission-free trading
    platformFee: 2.99,     // Monthly platform fee
    minTer: 0.0025,
    maxTer: 0.0075
  },
  'Trade Republic': {
    name: 'Trade Republic',
    fxMarkup: 0.0015,      // Low FX markup
    tradingFee: 1.00,      // €1 per trade
    platformFee: 0,        // No platform fee
    minTer: 0.0007,
    maxTer: 0.0070
  },
  'Interactive Brokers': {
    name: 'Interactive Brokers',
    fxMarkup: 0.0002,      // Lowest FX markup in industry
    tradingFee: 2.00,      // €2 per trade
    platformFee: 0,        // No platform fee for larger accounts
    minTer: 0.0007,
    maxTer: 0.0150
  },
  'Robinhood': {
    name: 'Robinhood',
    fxMarkup: 0.0030,      // Moderate FX markup
    tradingFee: 0,         // Commission-free trading
    platformFee: 0,        // No platform fee
    minTer: 0.0000,        // Stocks have no TER
    maxTer: 0.0100
  },
  'Vanguard': {
    name: 'Vanguard',
    fxMarkup: 0.0015,      // Low FX markup
    tradingFee: 0,         // Free for Vanguard funds
    platformFee: 0,        // No platform fee
    minTer: 0.0003,        // Very low TER funds
    maxTer: 0.0080
  },
  'Fidelity': {
    name: 'Fidelity',
    fxMarkup: 0.0020,
    tradingFee: 0,         // Commission-free trading
    platformFee: 0,
    minTer: 0.0000,        // Some zero-fee funds
    maxTer: 0.0090
  },
  'Charles Schwab': {
    name: 'Charles Schwab',
    fxMarkup: 0.0018,
    tradingFee: 0,         // Commission-free trading
    platformFee: 0,
    minTer: 0.0003,
    maxTer: 0.0085
  },
  'eToro': {
    name: 'eToro',
    fxMarkup: 0.0050,      // Higher FX markup
    tradingFee: 0,         // Commission-free stocks
    platformFee: 5.00,     // Monthly inactivity fee
    minTer: 0.0000,
    maxTer: 0.0120
  },
  'Saxo Bank': {
    name: 'Saxo Bank',
    fxMarkup: 0.0025,
    tradingFee: 3.00,      // €3 per trade
    platformFee: 0,
    minTer: 0.0005,
    maxTer: 0.0150
  },
  'Scalable Capital': {
    name: 'Scalable Capital',
    fxMarkup: 0.0020,
    tradingFee: 0.99,      // €0.99 per trade
    platformFee: 2.99,     // Monthly platform fee
    minTer: 0.0007,
    maxTer: 0.0080
  },
  // Default fallback for unknown brokers
  'DEFAULT': {
    name: 'Other',
    fxMarkup: 0.0020,      // Conservative estimate
    tradingFee: 5.00,      // Higher trading fee assumption
    platformFee: 0,
    minTer: 0.0020,
    maxTer: 0.0150
  }
};

/**
 * Comprehensive TER (Total Expense Ratio) dictionary
 * Contains real-world TER data for popular ETFs, stocks, and mutual funds
 */
const terDictionary: AssetTER = {
  // Popular European and Global ETFs
  'VWCE': { ter: 0.0022, type: 'ETF' },    // Vanguard FTSE All-World
  'IWDA': { ter: 0.0020, type: 'ETF' },    // iShares Core MSCI World
  'EUNL': { ter: 0.0020, type: 'ETF' },    // iShares Core MSCI World
  'VUSA': { ter: 0.0007, type: 'ETF' },    // Vanguard S&P 500
  'CSPX': { ter: 0.0007, type: 'ETF' },    // iShares Core S&P 500
  'MEUD': { ter: 0.0012, type: 'ETF' },    // Amundi MSCI Europe
  'VEUR': { ter: 0.0012, type: 'ETF' },    // Vanguard FTSE Europe
  'IEMA': { ter: 0.0018, type: 'ETF' },    // iShares Core MSCI EM
  'VFEM': { ter: 0.0022, type: 'ETF' },    // Vanguard FTSE Emerging Markets
  'AGGH': { ter: 0.0010, type: 'ETF' },    // iShares Core Global Aggregate Bond
  'IUSQ': { ter: 0.0007, type: 'ETF' },    // iShares Core MSCI World Quality
  'HMWO': { ter: 0.0015, type: 'ETF' },    // iShares Edge MSCI World Momentum
  'SAWD': { ter: 0.0019, type: 'ETF' },    // SPDR ACWI
  'DBXW': { ter: 0.0019, type: 'ETF' },    // Xtrackers MSCI World
  'XDWD': { ter: 0.0019, type: 'ETF' },    // Xtrackers MSCI World
  'TRET.L': { ter: 0.0015, type: 'ETF' },  // Xtrackers II Global Real Estate
  
  // Individual Stocks (no TER - management fees don't apply)
  'AAPL': { ter: 0.0000, type: 'STOCK' },   // Apple Inc.
  'MSFT': { ter: 0.0000, type: 'STOCK' },   // Microsoft Corporation
  'GOOGL': { ter: 0.0000, type: 'STOCK' },  // Alphabet Inc.
  'AMZN': { ter: 0.0000, type: 'STOCK' },   // Amazon.com Inc.
  'TSLA': { ter: 0.0000, type: 'STOCK' },   // Tesla Inc.
  'FB': { ter: 0.0000, type: 'STOCK' },     // Meta Platforms Inc.
  'NVDA': { ter: 0.0000, type: 'STOCK' },   // NVIDIA Corporation
  'BRK.B': { ter: 0.0000, type: 'STOCK' },  // Berkshire Hathaway
  'JPM': { ter: 0.0000, type: 'STOCK' },    // JPMorgan Chase & Co.
  'JNJ': { ter: 0.0000, type: 'STOCK' },    // Johnson & Johnson
  'V': { ter: 0.0000, type: 'STOCK' },      // Visa Inc.
  'PG': { ter: 0.0000, type: 'STOCK' },     // Procter & Gamble
  'UNH': { ter: 0.0000, type: 'STOCK' },    // UnitedHealth Group
  'HD': { ter: 0.0000, type: 'STOCK' },     // Home Depot
  'BAC': { ter: 0.0000, type: 'STOCK' },    // Bank of America
  'MA': { ter: 0.0000, type: 'STOCK' },     // Mastercard Inc.
  'DIS': { ter: 0.0000, type: 'STOCK' },    // Walt Disney Company
  'PYPL': { ter: 0.0000, type: 'STOCK' },   // PayPal Holdings
  'CMCSA': { ter: 0.0000, type: 'STOCK' },  // Comcast Corporation
  'XOM': { ter: 0.0000, type: 'STOCK' },    // Exxon Mobil Corporation
  
  // Mutual Funds (typically higher TER due to active management)
  'FCNTX': { ter: 0.0082, type: 'FUND' },   // Fidelity Contrafund
  'PRGFX': { ter: 0.0065, type: 'FUND' },   // T. Rowe Price Growth Stock
  'VFIAX': { ter: 0.0040, type: 'FUND' },   // Vanguard 500 Index Admiral
  'VTSMX': { ter: 0.0140, type: 'FUND' },   // Vanguard Total Stock Market
  'VTSAX': { ter: 0.0030, type: 'FUND' },   // Vanguard Total Stock Market Admiral
  'VTIAX': { ter: 0.0011, type: 'FUND' },   // Vanguard Total International Stock
  'AGTHX': { ter: 0.0068, type: 'FUND' },   // American Growth Fund
  'AIVSX': { ter: 0.0075, type: 'FUND' },   // American International Value
  'ANCFX': { ter: 0.0095, type: 'FUND' },   // American New Century Fund
  'CWGIX': { ter: 0.0110, type: 'FUND' },   // Calamos Growth Fund
  
  // Default values for unknown assets by type
  'DEFAULT_ETF': { ter: 0.0030, type: 'ETF' },     // Conservative ETF estimate
  'DEFAULT_STOCK': { ter: 0.0000, type: 'STOCK' }, // Stocks have no management fees
  'DEFAULT_FUND': { ter: 0.0120, type: 'FUND' }    // Conservative mutual fund estimate
};

/**
 * Asset replacement suggestions for high-fee investments
 * Maps expensive assets to specific low-cost alternatives
 */
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

/**
 * Main function to calculate comprehensive portfolio costs
 * 
 * Processes each asset in the portfolio to calculate:
 * - Total Expense Ratio (TER) costs
 * - Foreign exchange markup fees
 * - Trading fees
 * - Platform/custody fees
 * - Total annual costs and percentages
 * - Optimization suggestions
 * 
 * @param portfolio - Array of portfolio assets to analyze
 * @returns Array of assets with calculated costs and suggestions
 */
export const calculatePortfolioCosts = (portfolio: PortfolioAsset[]): PortfolioAsset[] => {
  return portfolio.map(asset => {
    // Get broker-specific fee structure
    const brokerData = getBrokerFees(asset.broker);
    
    // Determine asset type and TER
    const { ter, type } = getAssetTER(asset.asset);
    
    // Calculate individual cost components
    const terCost = asset.amount * ter;                    // Annual TER cost
    const fxCost = asset.amount * brokerData.fxMarkup;     // FX conversion cost
    const platformFeeCost = brokerData.platformFee * 12;   // Annual platform fee
    
    // Calculate total annual cost
    const totalCost = terCost + fxCost + brokerData.tradingFee + platformFeeCost;
    const costPercent = (totalCost / asset.amount) * 100;
    
    // Generate optimization suggestion
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

/**
 * Retrieves broker fee structure with fallback to default
 * 
 * @param broker - Broker name to look up
 * @returns BrokerFee object with fee structure
 */
const getBrokerFees = (broker: string): BrokerFee => {
  // Normalize broker name for case-insensitive lookup
  const normalizedBroker = Object.keys(brokerFees).find(
    key => key.toLowerCase() === broker.toLowerCase()
  );
  
  return brokerFees[normalizedBroker || 'DEFAULT'] || brokerFees['DEFAULT'];
};

/**
 * Determines asset TER and type using multiple detection methods
 * 
 * @param asset - Asset symbol or name
 * @returns Object with TER value and asset type
 */
const getAssetTER = (asset: string): { ter: number; type: 'ETF' | 'STOCK' | 'FUND' } => {
  // Direct lookup in TER dictionary
  if (terDictionary[asset]) {
    return terDictionary[asset];
  }
  
  // Pattern-based ETF detection
  if (asset.includes('ETF') || etfAssets.some(etf => asset.toUpperCase().includes(etf.toUpperCase()))) {
    return terDictionary['DEFAULT_ETF'];
  }
  
  // Pattern-based mutual fund detection
  if (mutualFundAssets.some(fund => asset.toUpperCase().includes(fund.toUpperCase()))) {
    return terDictionary['DEFAULT_FUND'];
  }
  
  // Default to stock (no TER)
  return terDictionary['DEFAULT_STOCK'];
};

/**
 * Generates intelligent optimization suggestions based on cost analysis
 * 
 * @param asset - Asset symbol
 * @param ter - Total Expense Ratio
 * @param type - Asset type (ETF, STOCK, FUND)
 * @param costPercent - Total cost as percentage
 * @returns Suggestion string for optimization
 */
const generateSuggestion = (asset: string, ter: number, type: string, costPercent: number): string => {
  // Check for specific asset suggestions first
  if (assetSuggestions[asset]) {
    return assetSuggestions[asset];
  }
  
  // High total cost threshold (>1% annually)
  if (costPercent > 1.0) {
    if (type === 'ETF') {
      return 'Switch to VWCE (TER 0.22%)';
    } else if (type === 'FUND') {
      return assetSuggestions['DEFAULT_HIGH_COST'];
    }
  } 
  // High TER threshold (>0.8% annually)
  else if (ter > 0.008) {
    if (type === 'ETF') {
      return 'Consider VWCE (TER 0.22%)';
    } else if (type === 'FUND') {
      return 'Consider low-cost ETF alternative';
    }
  }
  
  // Asset is already optimized
  return 'Hold';
};

// Asset classification arrays for pattern matching
const etfAssets = ['ETF', 'UCITS', 'Index', 'SPDR', 'iShares', 'Vanguard'];
const mutualFundAssets = ['Fund', 'Mutual', 'FCP', 'SICAV', 'OEF', 'Class'];