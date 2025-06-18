import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileUp, RefreshCw, AlertCircle, Info, CheckCircle, BarChart3 } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { parseCSV } from '../utils/csvParser';
import { generateRandomPortfolio } from '../utils/portfolioGenerator';
import Tooltip from '../components/ui/Tooltip';

const PortfolioInput: React.FC = () => {
  const { setPortfolioData } = usePortfolio();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file: File) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await parseCSV(file);
      
      if (result.length === 0) {
        throw new Error('The uploaded file is empty or has an invalid format.');
      }
      
      setPortfolioData(result);
      navigate('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while parsing the file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };
  
  const handleGenerateRandom = () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const randomPortfolio = generateRandomPortfolio();
      setPortfolioData(randomPortfolio);
      
      // Simulate a small delay to show the loading state
      setTimeout(() => {
        setIsLoading(false);
        navigate('/results');
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the portfolio.');
      setIsLoading(false);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        await handleFileUpload(file);
      } else {
        setError('Please upload a CSV file.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success to-primary rounded-2xl mb-6">
            <BarChart3 className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Analyze Your Investment Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your portfolio data or generate a random example to discover hidden fees and optimize your investments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* File Upload Card */}
          <div 
            className={`card flex flex-col items-center justify-center p-8 cursor-pointer border-2 border-dashed transition-all duration-300 ${
              dragActive 
                ? 'border-primary bg-primary-50' 
                : 'border-gray-300 hover:border-primary hover:bg-primary-50/30'
            }`}
            onClick={triggerFileInput}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".csv"
              onChange={handleFileInputChange}
              disabled={isLoading}
            />
            <div className="h-20 w-20 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
              <FileUp className="text-primary" size={40} />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Upload CSV File</h3>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Upload your own portfolio data from a CSV file or drag and drop it here.
            </p>
            <button 
              className="btn-primary px-6 py-3 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Choose File'}
            </button>
            <div className="mt-6 flex items-center">
              <Info size={16} className="text-gray-400 mr-2" />
              <Tooltip text="Your CSV file should have columns: Asset, Amount, Broker. See example format below.">
                <span className="text-sm text-gray-500 underline cursor-help">
                  File format requirements
                </span>
              </Tooltip>
            </div>
          </div>
          
          {/* Generate Example Card */}
          <div 
            className="card flex flex-col items-center justify-center p-8 cursor-pointer border-2 border-dashed border-gray-300 hover:border-success hover:bg-success-50/30 transition-all duration-300"
            onClick={handleGenerateRandom}
          >
            <div className="h-20 w-20 bg-success-100 rounded-2xl flex items-center justify-center mb-6">
              <RefreshCw className={`text-success ${isLoading ? 'animate-spin' : ''}`} size={40} />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Generate Example</h3>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Generate a realistic sample portfolio to explore the fee analysis features.
            </p>
            <button 
              className="btn-success px-6 py-3 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Generating Portfolio...' : 'Generate Sample Portfolio'}
            </button>
            <div className="mt-6 flex items-center">
              <Info size={16} className="text-gray-400 mr-2" />
              <Tooltip text="Creates a diversified portfolio with 10-15 assets including stocks, ETFs, and mutual funds across different brokers">
                <span className="text-sm text-gray-500 underline cursor-help">
                  What's included?
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mb-8 p-6 bg-danger-50 text-danger rounded-xl flex items-start border border-danger-200">
            <AlertCircle className="flex-shrink-0 mr-3 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold mb-1">Upload Error</h4>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="h-12 w-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="text-primary" size={24} />
            </div>
            <h4 className="font-semibold mb-2">Comprehensive Analysis</h4>
            <p className="text-sm text-gray-600">Detailed breakdown of all fees including TER, FX markup, and platform costs</p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-success" size={24} />
            </div>
            <h4 className="font-semibold mb-2">Smart Recommendations</h4>
            <p className="text-sm text-gray-600">Personalized suggestions to reduce fees and optimize your portfolio</p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Upload className="text-warning" size={24} />
            </div>
            <h4 className="font-semibold mb-2">Export Results</h4>
            <p className="text-sm text-gray-600">Download your analysis as CSV for further review and planning</p>
          </div>
        </div>
        
        {/* CSV Format Example */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Info className="mr-2 text-primary" size={20} />
            CSV Format Example
          </h3>
          <p className="text-gray-600 mb-6">
            Your CSV file should include the following columns in this exact format:
          </p>
          <div className="bg-white p-6 rounded-xl border border-gray-300 font-mono text-sm overflow-x-auto shadow-inner">
            <div className="grid grid-cols-3 gap-4 mb-2 font-semibold text-gray-700 border-b border-gray-200 pb-2">
              <div>Asset</div>
              <div>Amount</div>
              <div>Broker</div>
            </div>
            <div className="space-y-1 text-gray-600">
              <div className="grid grid-cols-3 gap-4">
                <div>VWCE</div>
                <div>10000</div>
                <div>Interactive Brokers</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>AAPL</div>
                <div>5000</div>
                <div>Robinhood</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>TRET.L</div>
                <div>7500</div>
                <div>Degiro</div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start">
              <CheckCircle className="text-success mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <span className="font-medium">Asset:</span> Stock ticker or fund name
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-success mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <span className="font-medium">Amount:</span> Investment value in EUR
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-success mr-2 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <span className="font-medium">Broker:</span> Your investment platform
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioInput;