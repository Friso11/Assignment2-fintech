import { saveAs } from 'file-saver';
import { PortfolioAsset } from '../types/portfolio';

export const exportToCSV = (data: PortfolioAsset[], filename: string) => {
  // Create CSV headers
  const headers = [
    'Asset',
    'Amount (€)',
    'Broker',
    'TER (%)',
    'FX Markup (%)',
    'Trading Fee (€)',
    'Est. Annual Cost (€)',
    'Cost (%)',
    'Suggestion'
  ];
  
  // Convert data to CSV rows
  const rows = data.map(item => [
    item.asset,
    item.amount.toString(),
    item.broker,
    item.ter ? (item.ter * 100).toFixed(3) : '0.000',
    item.fxMarkup ? (item.fxMarkup * 100).toFixed(3) : '0.000',
    item.tradingFee ? item.tradingFee.toFixed(2) : '0.00',
    item.estimatedCost.toFixed(2),
    item.costPercent.toFixed(3),
    item.suggestion
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${filename}-${getFormattedDate()}.csv`);
};

// Helper function to format date for filename
const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};