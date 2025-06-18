import React from 'react';
import { DollarSign, TrendingDown, BarChart3, PiggyBank, Percent, Building } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

interface SummaryCardsProps {
  totalValue: number;
  totalCost: number;
  averageCostPercent: number;
  potentialSavings: number;
  averageTER: number;
  totalPlatformFees: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalValue = 0,
  totalCost = 0,
  averageCostPercent = 0,
  potentialSavings = 0,
  averageTER = 0,
  totalPlatformFees = 0
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      <div className="card bg-white">
        <div className="flex items-start">
          <div className="h-12 w-12 bg-primary-50 rounded-full flex items-center justify-center mr-4">
            <DollarSign className="text-primary\" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Portfolio Value</h3>
            <p className="text-2xl font-bold mt-1">€{Number(totalValue).toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="card bg-white">
        <div className="flex items-start">
          <div className="h-12 w-12 bg-danger-50 rounded-full flex items-center justify-center mr-4">
            <BarChart3 className="text-danger" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Annual Fee Cost</h3>
            <p className="text-2xl font-bold mt-1">€{Number(totalCost).toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="card bg-white">
        <div className="flex items-start">
          <div className="h-12 w-12 bg-warning-50 rounded-full flex items-center justify-center mr-4">
            <TrendingDown className="text-warning" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Average Fee</h3>
            <p className="text-2xl font-bold mt-1">{Number(averageCostPercent).toFixed(2)}%</p>
          </div>
        </div>
      </div>
      
      <div className="card bg-white">
        <div className="flex items-start">
          <div className="h-12 w-12 bg-success-50 rounded-full flex items-center justify-center mr-4">
            <PiggyBank className="text-success" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Potential Savings</h3>
            <p className="text-2xl font-bold mt-1">€{Number(potentialSavings).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="card bg-white">
        <div className="flex items-start">
          <div className="h-12 w-12 bg-primary-50 rounded-full flex items-center justify-center mr-4">
            <Percent className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Average TER</h3>
            <p className="text-2xl font-bold mt-1">{(Number(averageTER) * 100).toFixed(3)}%</p>
          </div>
        </div>
      </div>

      <div className="card bg-white">
        <div className="flex items-start">
          <div className="h-12 w-12 bg-warning-50 rounded-full flex items-center justify-center mr-4">
            <Building className="text-warning" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Platform Fees</h3>
            <p className="text-2xl font-bold mt-1">€{Number(totalPlatformFees).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;