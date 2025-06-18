import Papa from 'papaparse';
import { PortfolioAsset } from '../types/portfolio';

export const parseCSV = (file: File): Promise<PortfolioAsset[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error('Error parsing CSV: ' + results.errors[0].message));
          return;
        }
        
        try {
          const data = results.data as any[];
          
          // Validate required columns
          const requiredColumns = ['Asset', 'Amount', 'Broker'];
          const missingColumns = requiredColumns.filter(col => 
            !results.meta.fields?.includes(col)
          );
          
          if (missingColumns.length > 0) {
            reject(new Error(`Missing required columns: ${missingColumns.join(', ')}`));
            return;
          }
          
          // Convert to portfolio assets
          const portfolioAssets: PortfolioAsset[] = data.map(row => ({
            asset: row.Asset,
            amount: parseFloat(row.Amount),
            broker: row.Broker,
            estimatedCost: 0, // Will be calculated later
            costPercent: 0,   // Will be calculated later
            suggestion: ''    // Will be populated later
          }));
          
          // Validate numeric values
          const invalidItems = portfolioAssets.filter(item => isNaN(item.amount));
          if (invalidItems.length > 0) {
            reject(new Error('Invalid amount values found in CSV.'));
            return;
          }
          
          resolve(portfolioAssets);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};