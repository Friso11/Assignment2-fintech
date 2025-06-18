import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './contexts/PortfolioContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ChatBot from './components/chatbot/ChatBot';
import LandingPage from './pages/LandingPage';
import PortfolioInput from './pages/PortfolioInput';
import PortfolioResults from './pages/PortfolioResults';

function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/input" element={<PortfolioInput />} />
            <Route path="/results" element={<PortfolioResults />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </PortfolioProvider>
  );
}

export default App;