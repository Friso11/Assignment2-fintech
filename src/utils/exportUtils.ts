import { saveAs } from 'file-saver';
import { PortfolioAsset } from '../types/portfolio';

/**
 * Export Utilities
 * 
 * Handles exporting portfolio analysis results to various formats.
 * Currently supports CSV export with comprehensive data including
 * all calculated fees, percentages, and optimization suggestions.
 * 
 * Features:
 * - CSV export with proper formatting
 * - Automatic filename generation with timestamps
 * - Comprehensive data inclusion (all calculated fields)
 * - Cross-browser compatibility
 */

/**
 * Exports portfolio analysis data to CSV format
 * 
 * Creates a comprehensive CSV file containing all portfolio data,
 * calculated fees, cost percentages, and optimization suggestions.
 * The file is automatically downloaded with a timestamped filename.
 * 
 * @param data - Array of analyzed portfolio assets
 * @param filename - Base filename (timestamp will be appended)
 */
export const exportToCSV = (data: PortfolioAsset[], filename: string) => {
  // Define CSV headers with descriptive names
  const headers = [
    'Asset',                    // Asset symbol or name
    'Amount (€)',              // Investment amount in euros
    'Broker',                  // Investment platform
    'TER (%)',                 // Total Expense Ratio as percentage
    'FX Markup (%)',           // Foreign exchange markup as percentage
    'Trading Fee (€)',         // Per-trade fee in euros
    'Platform Fee (€)',        // Annual platform fee in euros
    'Est. Annual Cost (€)',    // Total estimated annual cost
    'Cost (%)',                // Total cost as percentage of investment
    'Suggestion'               // Optimization recommendation
  ];
  
  // Convert portfolio data to CSV-formatted rows
  const rows = data.map(item => [
    item.asset,
    item.amount.toString(),
    item.broker,
    item.ter ? (item.ter * 100).toFixed(3) : '0.000',           // Convert to percentage with 3 decimals
    item.fxMarkup ? (item.fxMarkup * 100).toFixed(3) : '0.000', // Convert to percentage with 3 decimals
    item.tradingFee ? item.tradingFee.toFixed(2) : '0.00',      // Format to 2 decimal places
    item.platformFee ? item.platformFee.toFixed(2) : '0.00',    // Format to 2 decimal places
    item.estimatedCost.toFixed(2),                              // Format to 2 decimal places
    item.costPercent.toFixed(3),                                // Format to 3 decimal places
    item.suggestion
  ]);
  
  // Combine headers and data rows
  const csvContent = [
    headers.join(','),                                          // Header row
    ...rows.map(row => row.map(cell => 
      // Escape cells containing commas or quotes
      typeof cell === 'string' && (cell.includes(',') || cell.includes('"')) 
        ? `"${cell.replace(/"/g, '""')}"` 
        : cell
    ).join(','))
  ].join('\n');
  
  // Create blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${filename}-${getFormattedDate()}.csv`);
};

/**
 * Generates a formatted date string for filenames
 * 
 * @returns String in YYYY-MM-DD format
 */
const getFormattedDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};