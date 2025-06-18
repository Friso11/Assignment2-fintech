import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, PieChart, LineChart, TrendingUp, DollarSign, CheckCircle, AlertTriangle, Upload, Shield, Eye, Target } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-success-50 via-white to-primary-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="mb-6">
                <span className="inline-block bg-success-100 text-success-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Investment Fee Analyzer
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Know what you <span className="text-success">really</span> pay for your investments
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Uncover hidden fees, reduce costs, and optimize your investment portfolio with ClearVest's powerful fee analyzer. Take control of your financial future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/input" className="btn-primary px-8 py-4 text-lg font-semibold">
                  Analyze Your Portfolio
                </Link>
                <a href="#features" className="btn-secondary px-8 py-4 text-lg font-semibold">
                  Learn More
                </a>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield size={16} className="mr-2 text-success" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center">
                  <Eye size={16} className="mr-2 text-success" />
                  <span>No Registration Required</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-success to-primary rounded-2xl blur-lg opacity-20"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-success to-primary p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">€127,450</div>
                        <div className="text-sm text-gray-600">Portfolio Value</div>
                      </div>
                      <div className="bg-danger-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-danger">€1,247</div>
                        <div className="text-sm text-gray-600">Annual Fees</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">VWCE</span>
                        <span className="text-sm font-medium text-success">0.22%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">AAPL</span>
                        <span className="text-sm font-medium text-success">0.00%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">FCNTX</span>
                        <span className="text-sm font-medium text-danger">0.82%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ClearVest?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We help you identify and eliminate unnecessary fees that eat into your investment returns over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card hover:shadow-xl transition-all duration-300">
              <div className="h-16 w-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Fee Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed breakdown of all costs including TERs, trading fees, FX markups, and platform charges across all your investments.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-all duration-300">
              <div className="h-16 w-16 bg-success-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-success" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized suggestions to reduce fees and optimize your investment portfolio for better long-term returns.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-all duration-300">
              <div className="h-16 w-16 bg-warning-100 rounded-2xl flex items-center justify-center mb-6">
                <PieChart className="text-warning" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Easy-to-understand charts and graphs that visualize your fee exposure and potential savings over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to optimize your investment portfolio and save money on fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mb-6 text-white font-bold text-2xl shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your Portfolio</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Import your investment data via CSV or generate a sample portfolio to get started with the analysis.
              </p>
              <div className="h-16 w-16 bg-primary-50 rounded-xl flex items-center justify-center">
                <Upload className="text-primary" size={32} />
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mb-6 text-white font-bold text-2xl shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Analyze Fee Structure</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our algorithm identifies all fees and calculates their impact on your returns with real market data.
              </p>
              <div className="h-16 w-16 bg-success-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="text-success" size={32} />
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mb-6 text-white font-bold text-2xl shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Receive personalized suggestions to reduce fees and improve your portfolio performance.
              </p>
              <div className="h-16 w-16 bg-warning-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-success" size={32} />
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/input" className="btn-primary px-8 py-4 text-lg font-semibold">
              Start Analyzing Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">€2.3B+</div>
              <div className="text-gray-600">Assets Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">€127M+</div>
              <div className="text-gray-600">Fees Identified</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-warning mb-2">15,000+</div>
              <div className="text-gray-600">Portfolios Optimized</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-danger mb-2">0.73%</div>
              <div className="text-gray-600">Average Fee Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-success to-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to optimize your investment portfolio?
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Take control of your investments today and stop paying unnecessary fees. Join thousands of investors who have already optimized their portfolios.
          </p>
          <Link to="/input" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;