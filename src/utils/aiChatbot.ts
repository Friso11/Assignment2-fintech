import { PortfolioAsset } from '../types/portfolio';

/**
 * AI Chatbot Utility Functions
 * 
 * This module provides intelligent responses for the investment advisor chatbot.
 * It analyzes portfolio data and generates contextual advice based on user queries.
 * 
 * Key Features:
 * - Portfolio-aware responses with real data analysis
 * - Fee optimization recommendations
 * - Asset replacement suggestions
 * - Long-term impact calculations
 * - Broker comparison and advice
 */

interface AIResponse {
  content: string;
  suggestions?: string[];
}

/**
 * Generates AI responses based on user messages and portfolio data
 * 
 * @param userMessage - The user's question or request
 * @param portfolioData - Current portfolio data for analysis
 * @returns Promise<AIResponse> - AI response with content and suggestions
 */
export const generateAIResponse = async (userMessage: string, portfolioData: PortfolioAsset[]): Promise<AIResponse> => {
  const message = userMessage.toLowerCase();
  
  // Calculate portfolio metrics if data is available
  const hasPortfolio = portfolioData.length > 0;
  let totalValue = 0;
  let totalCost = 0;
  let highestCostAsset = '';
  let highestCostPercent = 0;
  let expensiveAssets: PortfolioAsset[] = [];
  
  if (hasPortfolio) {
    // Calculate total portfolio value and costs
    totalValue = portfolioData.reduce((sum, asset) => sum + asset.amount, 0);
    totalCost = portfolioData.reduce((sum, asset) => sum + asset.estimatedCost, 0);
    
    // Find highest cost asset and expensive assets
    portfolioData.forEach(asset => {
      if (asset.costPercent > highestCostPercent) {
        highestCostPercent = asset.costPercent;
        highestCostAsset = asset.asset;
      }
      if (asset.costPercent > 0.8) {
        expensiveAssets.push(asset);
      }
    });
  }

  // Fee-related questions
  if (message.includes('fee') || message.includes('cost') || message.includes('expensive')) {
    if (!hasPortfolio) {
      return {
        content: "To analyze your fees, please upload your portfolio first. Investment fees typically include:\n\n• **TER (Total Expense Ratio)**: Annual fund management fee\n• **Trading fees**: Cost per transaction\n• **FX markup**: Foreign exchange conversion fees\n• **Platform fees**: Broker maintenance charges\n\nThese can significantly impact your long-term returns!",
        suggestions: [
          "How much do fees impact returns?",
          "What's a good TER for ETFs?",
          "How to choose a low-cost broker?"
        ]
      };
    }

    const avgCostPercent = totalValue > 0 ? (totalCost / totalValue) * 100 : 0;
    return {
      content: `Your portfolio analysis shows:\n\n💰 **Total annual fees**: €${totalCost.toFixed(2)}\n📊 **Average fee rate**: ${avgCostPercent.toFixed(2)}%\n⚠️ **Highest cost asset**: ${highestCostAsset} (${highestCostPercent.toFixed(2)}%)\n\n${avgCostPercent > 1 ? '🚨 Your fees are quite high! ' : avgCostPercent > 0.5 ? '⚡ There\'s room for optimization. ' : '✅ Your fees are reasonable. '}${expensiveAssets.length > 0 ? `Consider replacing ${expensiveAssets.length} high-cost assets.` : 'Focus on maintaining low costs.'}`,
      suggestions: [
        "Which assets should I replace?",
        "Show me low-cost alternatives",
        "How much could I save?",
        "What's the impact over 20 years?"
      ]
    };
  }

  // Biggest cost concern questions
  if (message.includes('biggest') && (message.includes('cost') || message.includes('concern') || message.includes('problem'))) {
    if (!hasPortfolio) {
      return {
        content: "Upload your portfolio first so I can identify your biggest cost concerns. Common issues include:\n\n🔴 **High TER funds** (>1% annually)\n🔴 **Expensive brokers** with high FX markups\n🔴 **Frequent trading** generating fees\n🔴 **Platform fees** eating into returns",
        suggestions: [
          "What are typical fee ranges?",
          "How to choose a low-cost broker?",
          "Best practices for fee reduction"
        ]
      };
    }

    if (totalValue === 0 || totalCost === 0) {
      return {
        content: "I notice your portfolio data might not be fully processed yet. Please try refreshing the analysis or re-uploading your portfolio data.",
        suggestions: [
          "How to upload portfolio data?",
          "What format should my CSV be?",
          "Generate a sample portfolio"
        ]
      };
    }

    // Find the most expensive asset by absolute cost
    const mostExpensiveAsset = portfolioData.reduce((max, asset) => 
      asset.estimatedCost > max.estimatedCost ? asset : max
    );

    // Find broker with highest total fees
    const brokerCosts = portfolioData.reduce((acc, asset) => {
      if (!acc[asset.broker]) acc[asset.broker] = 0;
      acc[asset.broker] += asset.estimatedCost;
      return acc;
    }, {} as Record<string, number>);

    const mostExpensiveBroker = Object.entries(brokerCosts).reduce((max, [broker, cost]) => 
      cost > max[1] ? [broker, cost] : max
    );

    const avgCostPercent = (totalCost / totalValue) * 100;

    return {
      content: `🎯 **Your biggest cost concerns**:\n\n1️⃣ **Highest cost asset**: ${mostExpensiveAsset.asset}\n   • Annual cost: €${mostExpensiveAsset.estimatedCost.toFixed(2)}\n   • Cost rate: ${mostExpensiveAsset.costPercent.toFixed(2)}%\n\n2️⃣ **Most expensive broker**: ${mostExpensiveBroker[0]}\n   • Total annual fees: €${mostExpensiveBroker[1].toFixed(2)}\n\n📊 **Overall portfolio**: ${avgCostPercent.toFixed(2)}% annual fees\n\n${avgCostPercent > 1 ? '🚨 **Action needed**: Your fees are significantly above optimal levels!' : avgCostPercent > 0.5 ? '⚡ **Room for improvement**: Consider optimizing high-cost positions.' : '✅ **Well optimized**: Your fees are in a reasonable range.'}`,
      suggestions: [
        `Replace ${mostExpensiveAsset.asset}`,
        "Show me broker alternatives",
        "Calculate potential savings",
        "Long-term impact analysis"
      ]
    };
  }

  // Reduction and optimization questions
  if (message.includes('reduce') || message.includes('lower') || message.includes('optimize') || message.includes('save')) {
    if (!hasPortfolio) {
      return {
        content: "Here are proven strategies to reduce investment fees:\n\n🎯 **Choose low-cost ETFs** (TER < 0.3%)\n🏦 **Use discount brokers** (Interactive Brokers, Trade Republic)\n💱 **Avoid currency conversion** when possible\n📈 **Buy and hold** to minimize trading fees\n🔄 **Consolidate brokers** to reduce platform fees",
        suggestions: [
          "Best low-cost ETFs for beginners",
          "How to choose a broker?",
          "What's the difference between ETFs and mutual funds?"
        ]
      };
    }

    const potentialSavings = expensiveAssets.reduce((sum, asset) => {
      const potentialCost = asset.amount * 0.003; // Assume 0.3% optimized cost
      return sum + (asset.estimatedCost - potentialCost);
    }, 0);

    return {
      content: `Here's how to optimize your portfolio:\n\n💡 **Immediate actions**:\n${expensiveAssets.slice(0, 3).map(asset => `• Replace ${asset.asset} → Save ~€${(asset.estimatedCost - asset.amount * 0.003).toFixed(0)}/year`).join('\n')}\n\n📈 **Potential annual savings**: €${potentialSavings.toFixed(2)}\n🚀 **20-year impact**: €${(potentialSavings * 20 * 1.07).toFixed(0)} (with 7% growth)\n\n${potentialSavings > 500 ? '🎯 High impact opportunity!' : potentialSavings > 100 ? '⚡ Moderate savings available.' : '✅ Already well optimized.'}`,
      suggestions: [
        "Show specific alternatives",
        "How to switch investments?",
        "Tax implications of switching",
        "Best timing for changes"
      ]
    };
  }

  // Asset replacement questions
  if (message.includes('replace') || message.includes('alternative') || message.includes('switch') || message.includes('better')) {
    if (!hasPortfolio) {
      return {
        content: "Popular low-cost alternatives by category:\n\n🌍 **Global equity**: VWCE (0.22% TER)\n🇺🇸 **US market**: CSPX or VUSA (0.07% TER)\n🇪🇺 **European market**: VEUR (0.12% TER)\n🏦 **Bonds**: AGGH (0.10% TER)\n\nThese ETFs offer broad diversification at minimal cost!",
        suggestions: [
          "Explain VWCE vs IWDA",
          "Best broker for these ETFs",
          "How to build a simple portfolio"
        ]
      };
    }

    const replacements = expensiveAssets.slice(0, 3).map(asset => {
      if (asset.asset.includes('FCNTX') || asset.asset.includes('Fund')) {
        return `${asset.asset} → VWCE (Global ETF, 0.22% TER)`;
      }
      if (asset.asset.includes('US') || asset.asset.includes('AAPL')) {
        return `${asset.asset} → CSPX (S&P 500 ETF, 0.07% TER)`;
      }
      return `${asset.asset} → VWCE (Global diversification, 0.22% TER)`;
    });

    return {
      content: `🔄 **Recommended replacements**:\n\n${replacements.join('\n')}\n\n✅ **Benefits**:\n• Lower ongoing costs\n• Better diversification\n• Higher liquidity\n• Tax efficiency\n\n⚠️ **Before switching**: Check tax implications and timing!`,
      suggestions: [
        "Tax-efficient switching strategy",
        "How to research ETFs",
        "Timing the transition",
        "Broker transfer process"
      ]
    };
  }

  // Broker-related questions
  if (message.includes('broker') || message.includes('platform')) {
    const brokerAnalysis = hasPortfolio ? analyzeBrokers(portfolioData) : null;
    
    if (brokerAnalysis) {
      return {
        content: `📊 **Your broker analysis**:\n\n${brokerAnalysis.summary}\n\n🏆 **Recommended brokers**:\n• **Interactive Brokers**: Lowest FX fees (0.02%)\n• **Trade Republic**: €1 trading, no platform fees\n• **Degiro**: €2 trading, good for Europeans\n\n💡 Consider consolidating to reduce platform fees!`,
        suggestions: [
          "How to transfer between brokers?",
          "Compare broker fees",
          "Best broker for my country",
          "Consolidation strategy"
        ]
      };
    }

    return {
      content: "🏦 **Top low-cost brokers for 2024**:\n\n🥇 **Interactive Brokers**: Best for large portfolios\n🥈 **Trade Republic**: Great for Europeans\n🥉 **Degiro**: Solid all-rounder\n\n📋 **Key factors**:\n• Trading fees\n• FX markup rates\n• Platform/custody fees\n• Available markets\n• Regulatory protection",
      suggestions: [
        "Interactive Brokers vs Trade Republic",
        "How to evaluate broker costs",
        "Account transfer process",
        "Regulatory safety comparison"
      ]
    };
  }

  // Long-term impact questions
  if (message.includes('long term') || message.includes('20 year') || message.includes('impact') || message.includes('compound')) {
    const avgCostPercent = hasPortfolio && totalValue > 0 ? (totalCost / totalValue) * 100 : 1.5;
    const optimizedCost = 0.3;
    
    return {
      content: `📈 **Long-term fee impact** (€100k portfolio):\n\n**Current fees (${avgCostPercent.toFixed(1)}%)**:\n• 10 years: €${(100000 * Math.pow(1.07 - avgCostPercent/100, 10)).toFixed(0)}\n• 20 years: €${(100000 * Math.pow(1.07 - avgCostPercent/100, 20)).toFixed(0)}\n• 30 years: €${(100000 * Math.pow(1.07 - avgCostPercent/100, 30)).toFixed(0)}\n\n**Optimized fees (0.3%)**:\n• 30 years: €${(100000 * Math.pow(1.07 - 0.003, 30)).toFixed(0)}\n\n💰 **Difference**: €${(100000 * (Math.pow(1.07 - 0.003, 30) - Math.pow(1.07 - avgCostPercent/100, 30))).toFixed(0)} over 30 years!`,
      suggestions: [
        "How to calculate my specific impact?",
        "Compound interest explanation",
        "Fee optimization checklist",
        "When to review and rebalance?"
      ]
    };
  }

  // General investment advice
  if (message.includes('start') || message.includes('beginner') || message.includes('how to')) {
    return {
      content: "🚀 **Investment fundamentals**:\n\n1️⃣ **Start simple**: Global ETF (VWCE) covers everything\n2️⃣ **Keep costs low**: Target <0.5% total fees\n3️⃣ **Automate**: Set up monthly investments\n4️⃣ **Stay diversified**: Don't put all eggs in one basket\n5️⃣ **Think long-term**: Time in market beats timing market\n\n💡 **80/20 rule**: 80% of returns come from staying invested, 20% from optimization!",
      suggestions: [
        "Build a simple 3-ETF portfolio",
        "How much to invest monthly?",
        "Emergency fund vs investing",
        "Tax-advantaged accounts"
      ]
    };
  }

  // Default response
  return {
    content: hasPortfolio 
      ? `I can help you optimize your portfolio! Your current setup has ${portfolioData.length} assets with an average fee of ${totalValue > 0 ? ((totalCost / totalValue) * 100).toFixed(2) : '0.00'}%. What specific aspect would you like to improve?`
      : "I'm here to help you optimize your investments and reduce fees! Upload your portfolio for personalized advice, or ask me about general investment strategies.",
    suggestions: hasPortfolio ? [
      "Analyze my fees",
      "Show me alternatives",
      "How to reduce costs?",
      "Long-term impact"
    ] : [
      "How to start investing?",
      "Best low-cost ETFs",
      "Choosing a broker",
      "Investment basics"
    ]
  };
};

/**
 * Analyzes broker distribution and costs in the portfolio
 * 
 * @param portfolioData - Portfolio data to analyze
 * @returns Object with broker analysis summary
 */
const analyzeBrokers = (portfolioData: PortfolioAsset[]): { summary: string } => {
  const brokerCosts = portfolioData.reduce((acc, asset) => {
    if (!acc[asset.broker]) {
      acc[asset.broker] = { cost: 0, assets: 0 };
    }
    acc[asset.broker].cost += asset.estimatedCost;
    acc[asset.broker].assets += 1;
    return acc;
  }, {} as Record<string, { cost: number; assets: number }>);

  const sortedBrokers = Object.entries(brokerCosts)
    .sort(([,a], [,b]) => b.cost - a.cost)
    .slice(0, 3);

  const summary = sortedBrokers
    .map(([broker, data]) => `• **${broker}**: €${data.cost.toFixed(2)}/year (${data.assets} assets)`)
    .join('\n');

  return { summary };
};