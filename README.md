# ClearVest - Investment Fee Analyzer

![ClearVest Logo](https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## 🎯 What is ClearVest?

ClearVest is a comprehensive web application that helps retail investors uncover and reduce hidden investment fees in their portfolios. In the world of investing, fees can silently erode your returns over time - even seemingly small percentages can cost you tens of thousands of euros over decades.

**Why it matters:** A 1% difference in fees can cost you over €100,000 on a €100,000 portfolio over 30 years. ClearVest empowers you to identify these hidden costs and take action to optimize your investments.

## ✨ Key Features

### 📊 **Portfolio Analysis**
- **CSV Upload**: Import your existing portfolio data
- **Sample Generation**: Create realistic test portfolios to explore features
- **Multi-broker Support**: Analyze investments across different platforms

### 💰 **Comprehensive Fee Breakdown**
- **TER Analysis**: Total Expense Ratio calculation for funds and ETFs
- **Trading Fees**: Per-transaction costs across brokers
- **FX Markup**: Foreign exchange conversion fees
- **Platform Fees**: Annual custody and maintenance charges
- **Total Cost Visualization**: See exactly what you're paying annually

### 📈 **Interactive Visualizations**
- **Cost Bar Charts**: Compare fees across your holdings
- **Pie Charts**: Visualize fee distribution by broker
- **Long-term Projections**: See 30-year impact of current vs. optimized fees
- **Responsive Design**: Works perfectly on desktop and mobile

### 🤖 **AI-Powered Recommendations**
- **Personalized Advice**: Smart chatbot analyzes your specific portfolio
- **Asset Alternatives**: Specific low-cost replacements for expensive holdings
- **Broker Comparisons**: Find the most cost-effective platforms
- **Optimization Strategies**: Step-by-step guidance to reduce fees

### 📤 **Export & Reporting**
- **CSV Export**: Download complete analysis with all calculations
- **Detailed Reports**: Comprehensive breakdown of fees and suggestions
- **Shareable Results**: Easy to discuss with financial advisors

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for responsive, utility-first styling
- **Framer Motion** for smooth animations and transitions
- **Recharts** for interactive data visualizations
- **React Router** for seamless navigation

### Data Processing
- **Papa Parse** for robust CSV file handling
- **Axios** for API integrations
- **Date-fns** for date manipulation

### Development Tools
- **Vite** for fast development and building
- **ESLint** for code quality
- **TypeScript** for enhanced developer experience

### Deployment
- **Netlify** for hosting and continuous deployment

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/clearvest.git
   cd clearvest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📖 How to Use ClearVest

### Option 1: Upload Your Portfolio
1. **Prepare your CSV file** with the required format (see below)
2. **Click "Upload CSV File"** on the input page
3. **Select your file** or drag and drop it
4. **View your analysis** - you'll be redirected to the results page

### Option 2: Generate Sample Portfolio
1. **Click "Generate Example"** to create a realistic test portfolio
2. **Explore the features** with pre-populated data
3. **Understand the analysis** before uploading your real data

### Understanding Your Results
- **Summary Cards**: Quick overview of total value, costs, and savings potential
- **Detailed Table**: Asset-by-asset breakdown with specific recommendations
- **Charts**: Visual representation of your fee structure
- **AI Chatbot**: Ask questions about your portfolio for personalized advice

## 📋 CSV Format Requirements

Your CSV file must include these exact column headers:

```csv
Asset,Amount,Broker
VWCE,10000,Interactive Brokers
AAPL,5000,Robinhood
TRET.L,7500,Degiro
FCNTX,15000,Fidelity
CSPX,8000,Trade Republic
```

### Column Specifications
- **Asset**: Stock ticker, ETF symbol, or fund name
- **Amount**: Investment value in EUR (numbers only)
- **Broker**: Your investment platform name

### Supported Asset Types
- **ETFs**: VWCE, IWDA, CSPX, VUSA, etc.
- **Stocks**: AAPL, MSFT, GOOGL, TSLA, etc.
- **Mutual Funds**: FCNTX, VFIAX, PRGFX, etc.

### Supported Brokers
- Interactive Brokers, Degiro, Trade Republic, Robinhood
- Vanguard, Fidelity, Charles Schwab, eToro
- Saxo Bank, Scalable Capital, and many more

## 📁 Project Structure

```
clearvest/
├── public/
│   └── favicon.svg                 # App icon
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── charts/                # Data visualization components
│   │   │   ├── CostBarChart.tsx   # Fee comparison bar chart
│   │   │   ├── CostPieChart.tsx   # Broker distribution pie chart
│   │   │   └── FeeForecastChart.tsx # Long-term projection chart
│   │   ├── chatbot/               # AI advisor components
│   │   │   └── ChatBot.tsx        # Interactive AI chatbot
│   │   ├── layout/                # App layout components
│   │   │   ├── Header.tsx         # Navigation header
│   │   │   └── Footer.tsx         # Site footer
│   │   ├── portfolio/             # Portfolio-specific components
│   │   │   ├── PortfolioTable.tsx # Detailed asset table
│   │   │   └── SummaryCards.tsx   # Key metrics cards
│   │   └── ui/                    # Generic UI components
│   │       └── Tooltip.tsx        # Information tooltips
│   ├── contexts/                  # React context providers
│   │   └── PortfolioContext.tsx   # Portfolio data management
│   ├── pages/                     # Main application pages
│   │   ├── LandingPage.tsx        # Marketing homepage
│   │   ├── PortfolioInput.tsx     # Data upload interface
│   │   └── PortfolioResults.tsx   # Analysis results page
│   ├── types/                     # TypeScript type definitions
│   │   └── portfolio.ts           # Portfolio data types
│   ├── utils/                     # Utility functions
│   │   ├── aiChatbot.ts          # AI response generation
│   │   ├── csvParser.ts          # CSV file processing
│   │   ├── exportUtils.ts        # Data export functionality
│   │   ├── feeCalculator.ts      # Fee calculation engine
│   │   ├── marketData.ts         # Market price fetching
│   │   └── portfolioGenerator.ts  # Sample data generation
│   ├── App.tsx                    # Main application component
│   ├── index.css                  # Global styles and Tailwind
│   └── main.tsx                   # Application entry point
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build configuration
└── README.md                     # This file
```

## 🎥 Demo Video

[📹 Watch ClearVest in Action](https://your-demo-video-link.com)

*Coming soon: A comprehensive walkthrough showing how to upload your portfolio, interpret the results, and implement the recommendations.*

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on how to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏷️ GitHub Topics

`fintech` `investment-analysis` `fee-calculator` `portfolio-optimization` `react` `typescript` `tailwindcss` `data-visualization` `financial-tools` `investment-fees` `etf-analysis` `broker-comparison` `wealth-management` `personal-finance` `cost-analysis`

## 📞 Support & Contact

- **Email**: info@clearvest.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/clearvest/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/clearvest/discussions)

---

**Disclaimer**: ClearVest is for educational and informational purposes only. It does not constitute financial advice. Always consult with qualified financial professionals before making investment decisions.

**Made with ❤️ for the investing community**