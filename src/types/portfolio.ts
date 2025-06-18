/**
 * Portfolio Type Definitions
 * 
 * TypeScript interfaces and types for the portfolio analysis system.
 * These types ensure type safety throughout the application and provide
 * clear contracts for data structures used in fee calculations and analysis.
 */

/**
 * Core portfolio asset interface
 * Represents a single investment holding with all calculated fee data
 */
export interface PortfolioAsset {
  // Basic asset information
  asset: string;                    // Asset symbol or name (e.g., "VWCE", "AAPL")
  amount: number;                   // Investment amount in EUR
  broker: string;                   // Broker/platform name
  
  // Market data (optional)
  marketPrice?: number;             // Current market price per unit
  totalValue?: number;              // Total market value (amount * price)
  
  // Fee components
  ter?: number;                     // Total Expense Ratio (as decimal, e.g., 0.0022 = 0.22%)
  fxMarkup?: number;                // Foreign exchange markup fee (as decimal)
  tradingFee?: number;              // Trading fee per transaction in EUR
  platformFee?: number;             // Annual platform/custody fee in EUR
  
  // Calculated results
  estimatedCost: number;            // Total estimated annual cost in EUR
  costPercent: number;              // Total cost as percentage of investment
  suggestion: string;               // Optimization recommendation
}

/**
 * Broker fee structure interface
 * Defines the fee structure for different brokers
 */
export interface BrokerFee {
  name: string;                     // Broker display name
  fxMarkup: number;                 // FX markup as decimal (e.g., 0.0025 = 0.25%)
  tradingFee: number;               // Trading fee per transaction in EUR
  platformFee: number;              // Monthly platform fee in EUR
  minTer: number;                   // Minimum TER for assets on this platform
  maxTer: number;                   // Maximum TER for assets on this platform
}

/**
 * Asset TER (Total Expense Ratio) information
 * Maps asset symbols to their expense ratios and types
 */
export interface AssetTER {
  [asset: string]: {
    ter: number;                    // Total Expense Ratio as decimal
    type: 'ETF' | 'STOCK' | 'FUND'; // Asset classification
  };
}

/**
 * Market data interface for real-time pricing
 * Used when fetching current market prices for assets
 */
export interface MarketData {
  price: number;                    // Current price in base currency
  currency: string;                 // Price currency (e.g., "EUR", "USD")
  lastUpdated: string;              // ISO timestamp of last price update
}

/**
 * Portfolio summary statistics
 * Aggregated metrics for the entire portfolio
 */
export interface PortfolioSummary {
  totalValue: number;               // Total portfolio value in EUR
  totalCost: number;                // Total annual fees in EUR
  averageCostPercent: number;       // Weighted average cost percentage
  potentialSavings: number;         // Potential annual savings in EUR
  assetCount: number;               // Number of assets in portfolio
  brokerCount: number;              // Number of different brokers used
}

/**
 * Fee breakdown by category
 * Detailed breakdown of different fee types
 */
export interface FeeBreakdown {
  terFees: number;                  // Total TER fees in EUR
  tradingFees: number;              // Total trading fees in EUR
  fxFees: number;                   // Total FX markup fees in EUR
  platformFees: number;             // Total platform fees in EUR
}

/**
 * Optimization suggestion interface
 * Structured recommendations for portfolio improvements
 */
export interface OptimizationSuggestion {
  assetSymbol: string;              // Asset to optimize
  currentCost: number;              // Current annual cost in EUR
  suggestedAlternative: string;     // Recommended replacement
  potentialSaving: number;          // Annual savings in EUR
  reason: string;                   // Explanation for the suggestion
  priority: 'HIGH' | 'MEDIUM' | 'LOW'; // Optimization priority
}