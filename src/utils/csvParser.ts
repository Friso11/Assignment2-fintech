import Papa from 'papaparse';
import { PortfolioAsset } from '../types/portfolio';

/**
 * CSV Parser Utility
 * 
 * Handles parsing and validation of CSV files containing portfolio data.
 * Provides robust error handling and data validation to ensure clean
 * data input for the fee calculation engine.
 * 
 * Features:
 * - Automatic header detection and validation
 * - Data type validation and conversion
 * - Comprehensive error reporting
 * - Support for various CSV formats and encodings
 */

/**
 * Parses a CSV file and converts it to portfolio asset data
 * 
 * @param file - CSV file to parse
 * @returns Promise<PortfolioAsset[]> - Array of validated portfolio assets
 * @throws Error if parsing fails or data is invalid
 */
export const parseCSV = (file: File): Promise<PortfolioAsset[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,           // Use first row as headers
      skipEmptyLines: true,   // Ignore empty rows
      trimHeaders: true,      // Remove whitespace from headers
      complete: (results) => {
        // Check for parsing errors
        if (results.errors.length > 0) {
          reject(new Error('Error parsing CSV: ' + results.errors[0].message));
          return;
        }
        
        try {
          const data = results.data as any[];
          
          // Validate required columns exist
          const requiredColumns = ['Asset', 'Amount', 'Broker'];
          const availableColumns = results.meta.fields || [];
          const missingColumns = requiredColumns.filter(col => 
            !availableColumns.includes(col)
          );
          
          if (missingColumns.length > 0) {
            reject(new Error(`Missing required columns: ${missingColumns.join(', ')}. Please ensure your CSV has columns: Asset, Amount, Broker`));
            return;
          }
          
          // Convert and validate data
          const portfolioAssets: PortfolioAsset[] = data.map((row, index) => {
            // Validate required fields are not empty
            if (!row.Asset || !row.Amount || !row.Broker) {
              throw new Error(`Row ${index + 2} has empty required fields. All rows must have Asset, Amount, and Broker values.`);
            }
            
            // Parse and validate amount
            const amount = parseFloat(row.Amount);
            if (isNaN(amount) || amount <= 0) {
              throw new Error(`Row ${index + 2}: Amount "${row.Amount}" is not a valid positive number.`);
            }
            
            return {
              asset: row.Asset.trim(),
              amount: amount,
              broker: row.Broker.trim(),
              estimatedCost: 0,    // Will be calculated by fee calculator
              costPercent: 0,      // Will be calculated by fee calculator
              suggestion: ''       // Will be populated by fee calculator
            };
          });
          
          // Final validation - ensure we have at least one valid asset
          if (portfolioAssets.length === 0) {
            reject(new Error('No valid portfolio data found in CSV file.'));
            return;
          }
          
          resolve(portfolioAssets);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new Error(`Failed to parse CSV file: ${error.message}`));
      }
    });
  });
};