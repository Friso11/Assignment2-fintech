import React from 'react';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import { PortfolioAsset } from '../../types/portfolio';
import Tooltip from '../ui/Tooltip';

interface PortfolioTableProps {
  data: PortfolioAsset[];
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({ 
  data, 
  sortBy, 
  sortDirection, 
  onSort 
}) => {
  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    
    return sortDirection === 'asc' ? (
      <ArrowUp size={14} className="ml-1" />
    ) : (
      <ArrowDown size={14} className="ml-1" />
    );
  };
  
  const getSuggestionColor = (suggestion: string) => {
    if (suggestion.includes('Switch') || suggestion.includes('Consider')) return 'text-danger';
    return 'text-success';
  };

  const getCostColor = (costPercent: number) => {
    if (costPercent > 1) return 'text-danger';
    if (costPercent > 0.5) return 'text-warning';
    return 'text-success';
  };

  const getTERColor = (ter: number) => {
    if (ter > 0.01) return 'text-danger';
    if (ter > 0.005) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th 
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('asset')}
            >
              <div className="flex items-center">
                Asset {getSortIcon('asset')}
              </div>
            </th>
            <th 
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('amount')}
            >
              <div className="flex items-center">
                Amount (€) {getSortIcon('amount')}
              </div>
            </th>
            <th 
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('broker')}
            >
              <div className="flex items-center">
                Broker {getSortIcon('broker')}
              </div>
            </th>
            <th 
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('ter')}
            >
              <div className="flex items-center">
                TER (%) {getSortIcon('ter')}
                <Tooltip text="Total Expense Ratio - Annual fund management fee">
                  <Info size={14} className="ml-1 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </th>
            <th>
              <div className="flex items-center">
                FX Markup (%)
                <Tooltip text="Foreign exchange markup fee charged by broker">
                  <Info size={14} className="ml-1 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </th>
            <th>
              <div className="flex items-center">
                Trading Fee (€)
                <Tooltip text="Fee charged per trade execution">
                  <Info size={14} className="ml-1 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </th>
            <th>
              <div className="flex items-center">
                Platform Fee (€)
                <Tooltip text="Annual platform maintenance fee">
                  <Info size={14} className="ml-1 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </th>
            <th 
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('estimatedCost')}
            >
              <div className="flex items-center">
                Total Cost (€) {getSortIcon('estimatedCost')}
                <Tooltip text="Total annual cost including all fees">
                  <Info size={14} className="ml-1 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </th>
            <th 
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('costPercent')}
            >
              <div className="flex items-center">
                Cost % {getSortIcon('costPercent')}
                <Tooltip text="Total cost as percentage of investment amount">
                  <Info size={14} className="ml-1 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </th>
            <th>
              <div className="flex items-center">
                Suggestion
                <Tooltip text="Recommendation to optimize fees">
                  <Info size={14} className="ml-1 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((asset, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="font-medium text-gray-900">{asset.asset}</td>
              <td className="font-medium">€{asset.amount.toLocaleString()}</td>
              <td className="text-gray-600">{asset.broker}</td>
              <td className={`font-medium ${getTERColor(asset.ter || 0)}`}>
                {((asset.ter || 0) * 100).toFixed(3)}%
              </td>
              <td className="text-gray-600">
                {((asset.fxMarkup || 0) * 100).toFixed(3)}%
              </td>
              <td className="text-gray-600">
                €{(asset.tradingFee || 0).toFixed(2)}
              </td>
              <td className="text-gray-600">
                €{(asset.platformFee || 0).toFixed(2)}
              </td>
              <td className="font-medium text-gray-900">
                €{asset.estimatedCost.toFixed(2)}
              </td>
              <td className={`font-medium ${getCostColor(asset.costPercent)}`}>
                {asset.costPercent.toFixed(2)}%
              </td>
              <td className={`font-medium text-sm ${getSuggestionColor(asset.suggestion)}`}>
                {asset.suggestion}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;