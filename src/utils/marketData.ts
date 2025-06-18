import axios from 'axios';
import { MarketData } from '../types/portfolio';

const YAHOO_FINANCE_API = 'https://query1.finance.yahoo.com/v8/finance/chart/';

export const fetchMarketPrice = async (symbol: string): Promise<MarketData> => {
  try {
    const response = await axios.get(`${YAHOO_FINANCE_API}${symbol}?interval=1d`);
    
    if (!response.data?.chart?.result?.[0]) {
      throw new Error('Invalid market data response');
    }
    
    const data = response.data.chart.result[0];
    const price = data.meta.regularMarketPrice;
    const currency = data.meta.currency;
    const timestamp = data.meta.regularMarketTime;
    
    return {
      price,
      currency,
      lastUpdated: new Date(timestamp * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error fetching market price:', error);
    throw new Error('Failed to fetch market price');
  }
};

export const enrichPortfolioWithMarketData = async (portfolio: any[]) => {
  const enrichedPortfolio = [];
  
  for (const asset of portfolio) {
    try {
      const marketData = await fetchMarketPrice(asset.asset);
      enrichedPortfolio.push({
        ...asset,
        marketPrice: marketData.price,
        totalValue: asset.amount * marketData.price
      });
    } catch (error) {
      // If market data fetch fails, keep original values
      enrichedPortfolio.push(asset);
    }
  }
  
  return enrichedPortfolio;
};