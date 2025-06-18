# ClearVest - Investment Fee Analyzer

ClearVest is a web application that helps retail investors uncover and reduce hidden investment fees in their portfolios. The app focuses on clarity, education, and trust, empowering users to make informed decisions about their investments.

![ClearVest Logo](src/assets/logo.png)

## Features

- Portfolio input via CSV upload or randomized portfolio generation
- Fee calculation engine that analyzes TER, FX markup, and trading fees
- Interactive visualizations showing cost distribution and potential savings
- Personalized recommendations for fee reduction
- Portfolio results export functionality
- Educational tooltips explaining financial terminology

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- File-saver for CSV export
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/clearvest.git
cd clearvest
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173.

## Usage

1. **Input Portfolio Data**: 
   - Upload your own CSV file with columns for Asset, Amount, and Broker
   - Or generate a random portfolio to explore the features

2. **Analyze Results**:
   - View the detailed breakdown of your portfolio fees
   - Explore the visualizations to understand fee impact
   - Review personalized suggestions for cost reduction

3. **Export Results**:
   - Download a CSV file with the complete analysis

## CSV Format

Your CSV file should include the following columns:
```
Asset,Amount,Broker
VWCE,10000,Interactive Brokers
AAPL,5000,Robinhood
TRET.L,7500,Degiro
```

## Project Structure

```
clearvest/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── charts/
│   │   ├── layout/
│   │   ├── portfolio/
│   │   └── ui/
│   ├── contexts/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── README.md
```

## License

This project is licensed under the MIT License.