import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { generateAIResponse } from '../../utils/aiChatbot';

/**
 * AI Chatbot Component
 * 
 * Provides personalized investment advice and portfolio optimization suggestions
 * through an interactive chat interface. The chatbot analyzes user portfolio data
 * and provides contextual recommendations based on fees, asset allocation, and
 * optimization opportunities.
 * 
 * Features:
 * - Real-time chat interface with typing indicators
 * - Portfolio-aware responses with specific recommendations
 * - Suggestion buttons for common questions
 * - Animated UI with smooth transitions
 * - Responsive design for mobile and desktop
 */

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const ChatBot: React.FC = () => {
  // State management for chat functionality
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Access portfolio data from context
  const { portfolioData } = usePortfolio();

  /**
   * Scrolls chat messages to bottom when new messages are added
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Initialize chatbot with welcome message when opened
   * Provides different welcome messages based on whether portfolio data exists
   */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: portfolioData.length > 0 
          ? "Hi! I've analyzed your portfolio and I'm here to help you optimize your investments. What would you like to know about your fees or investment strategy?"
          : "Hello! I'm your investment advisor. Upload your portfolio first, then I can provide personalized suggestions to reduce fees and optimize your investments.",
        timestamp: new Date(),
        suggestions: portfolioData.length > 0 ? [
          "How can I reduce my fees?",
          "Which assets should I replace?",
          "What's my biggest cost concern?",
          "Show me low-cost alternatives"
        ] : [
          "What are investment fees?",
          "How do I optimize my portfolio?",
          "What should I look for in low-cost investing?"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, portfolioData.length]);

  /**
   * Handles sending user messages and generating AI responses
   * Includes typing simulation for better user experience
   */
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time with realistic delay
    setTimeout(async () => {
      try {
        const botResponse = await generateAIResponse(inputValue, portfolioData);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: botResponse.content,
          timestamp: new Date(),
          suggestions: botResponse.suggestions
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        // Handle error gracefully
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "I apologize, but I'm having trouble processing your request right now. Please try again or ask a different question.",
          timestamp: new Date(),
          suggestions: [
            "How can I reduce my fees?",
            "What are the best low-cost ETFs?",
            "How to choose a broker?"
          ]
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 1000 + Math.random() * 1000);
  };

  /**
   * Handles clicking on suggestion buttons
   * Automatically fills input with suggested question
   */
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  /**
   * Handles Enter key press for sending messages
   * Prevents default behavior and sends message
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-success rounded-full shadow-lg flex items-center justify-center text-white z-50"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isOpen ? "0 0 0 0 rgba(44, 107, 237, 0)" : "0 0 0 8px rgba(44, 107, 237, 0.3)"
        }}
        transition={{ 
          boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        aria-label="Open AI Investment Advisor"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-success p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Investment Advisor</h3>
                    <p className="text-xs text-white/80">Powered by AI</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-gradient-to-br from-success to-primary text-white'
                      }`}>
                        {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`rounded-2xl p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                        
                        {/* Suggestion Buttons */}
                        {message.suggestions && (
                          <div className="mt-3 space-y-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="block w-full text-left text-xs bg-white/10 hover:bg-white/20 rounded-lg p-2 transition-colors border border-white/20"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Timestamp */}
                    <p className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center text-white">
                      <Bot size={16} />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your portfolio..."
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 bg-gradient-to-br from-primary to-success text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;