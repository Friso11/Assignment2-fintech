export interface PortfolioAsset {
  asset: string;
  amount: number;
  broker: string;
  marketPrice?: number;
  totalValue?: number;
  ter?: number;
  fxMarkup?: number;
  tradingFee?: number;
  platformFee?: number;
  estimatedCost: number;
  costPercent: number;
  suggestion: string;
}

export interface BrokerFee {
  name: string;
  fxMarkup: number;
  tradingFee: number;
  platformFee: number;
  minTer: number;
  maxTer: number;
}

export interface AssetTER {
  [asset: string]: {
    ter: number;
    type: 'ETF' | 'STOCK' | 'FUND';
  };
}

export interface MarketData {
  price: number;
  currency: string;
  lastUpdated: string;
}