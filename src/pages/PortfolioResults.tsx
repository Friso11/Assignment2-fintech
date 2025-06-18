import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw, Info, AlertCircle, Filter } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { calculatePortfolioCosts } from '../utils/feeCalculator';
import PortfolioTable from '../components/portfolio/PortfolioTable';
import CostBarChart from '../components/charts/CostBarChart';
import CostPieChart from '../components/charts/CostPieChart';
import FeeForecastChart from '../components/charts/FeeForecastChart';
import { exportToCSV } from '../utils/exportUtils';
import { PortfolioAsset } from '../types/portfolio';
import SummaryCards from '../components/portfolio/SummaryCards';

const PortfolioResults: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const navigate = useNavigate();
  const [processedData, setProcessedData] = useState<PortfolioAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('cost');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  useEffect(() => {
    if (!portfolioData || portfolioData.length === 0) {
      navigate('/input');
      return;
    }
    
    // Process the portfolio data
    const processedPortfolio = calculatePortfolioCosts(portfolioData);
    setProcessedData(processedPortfolio);
    setIsLoading(false);
  }, [portfolioData, navigate]);
  
  const handleExport = () => {
    exportToCSV(processedData, 'clearvest-portfolio-analysis');
  };
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };
  
  const sortedData = [...processedData].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'asset':
        valueA = a.asset;
        valueB = b.asset;
        break;
      case 'amount':
        valueA = a.amount;
        valueB = b.amount;
        break;
      case 'broker':
        valueA = a.broker;
        valueB = b.broker;
        break;
      case 'cost':
        valueA = a.estimatedCost;
        valueB = b.estimatedCost;
        break;
      case 'costPercent':
        valueA = a.costPercent;
        valueB = b.costPercent;
        break;
      default:
        valueA = a.estimatedCost;
        valueB = b.estimatedCost;
    }
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    } else {
      return sortDirection === 'asc' 
        ? (valueA as number) - (valueB as number) 
        : (valueB as number) - (valueA as number);
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Processing your portfolio data...</p>
        </div>
      </div>
    );
  }

  const totalPortfolioValue = processedData.reduce((sum, asset) => sum + asset.amount, 0);
  const totalCost = processedData.reduce((sum, asset) => sum + asset.estimatedCost, 0);
  const averageCostPercent = (totalCost / totalPortfolioValue) * 100;
  const potentialSavings = processedData
    .filter(asset => asset.suggestion !== 'Hold')
    .reduce((sum, asset) => {
      // Assuming we could reduce fees to 0.3% for assets with suggestions
      const potentialCost = asset.amount * 0.003;
      return sum + (asset.estimatedCost - potentialCost);
    }, 0);
  
  // Calculate average TER and total platform fees
  const averageTER = processedData.reduce((sum, asset) => sum + (asset.ter || 0), 0) / processedData.length;
  const totalPlatformFees = processedData.reduce((sum, asset) => sum + (asset.platformFee || 0), 0);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Portfolio Analysis</h1>
      <p className="text-gray-600 mb-8">
        Here's a detailed breakdown of your investment fees and potential savings.
      </p>
      
      <SummaryCards 
        totalValue={totalPortfolioValue}
        totalCost={totalCost}
        averageCostPercent={averageCostPercent}
        potentialSavings={potentialSavings}
        averageTER={averageTER}
        totalPlatformFees={totalPlatformFees}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Cost Breakdown</h2>
            <div className="flex space-x-2">
              <button 
                className="btn-secondary text-xs py-1 px-2 flex items-center"
                onClick={() => handleSort('cost')}
              >
                <Filter size={14} className="mr-1" />
                Sort by Cost
              </button>
            </div>
          </div>
          <CostBarChart data={sortedData} />
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Cost Distribution</h2>
          <CostPieChart data={sortedData} />
        </div>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Fee Impact Over Time</h2>
        <div className="mb-2 flex items-center">
          <Info size={16} className="text-gray-400 mr-2" />
          <p className="text-sm text-gray-600">
            Projected impact of fees on a €{totalPortfolioValue.toLocaleString()} portfolio over 30 years.
          </p>
        </div>
        <FeeForecastChart 
          initialAmount={totalPortfolioValue} 
          currentFeePercent={averageCostPercent / 100} 
          optimizedFeePercent={0.003} 
        />
      </div>
      
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Portfolio Details</h2>
          <button
            className="btn-secondary flex items-center"
            onClick={handleExport}
          >
            <Download size={16} className="mr-2" />
            Export CSV
          </button>
        </div>
        
        <PortfolioTable 
          data={sortedData} 
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>
      
      <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-success-800 mb-2">Optimization Potential</h2>
        <p className="text-success-700 mb-4">
          By optimizing your portfolio, you could save approximately <strong>€{potentialSavings.toFixed(2)}</strong> per year in fees.
        </p>
        <p className="text-success-600">
          Check the "Suggestion" column in the table above for specific recommendations for each asset.
        </p>
      </div>
      
      <div className="flex justify-center mt-8 mb-4">
        <button
          onClick={() => navigate('/input')}
          className="btn-primary flex items-center"
        >
          <RefreshCw size={16} className="mr-2" />
          Analyze Another Portfolio
        </button>
      </div>
    </div>
  );
};

export default PortfolioResults;