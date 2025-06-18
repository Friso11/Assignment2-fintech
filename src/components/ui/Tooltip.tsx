import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const getPositionClass = () => {
    switch (position) {
      case 'top': return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom': return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left': return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right': return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default: return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };

  return (
    <div 
      className="tooltip"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div 
        className={`tooltip-text ${getPositionClass()} ${isVisible ? 'visible opacity-100' : ''}`}
        style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
      >
        {text}
        <div 
          className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
            position === 'top' ? 'top-full -mt-1 left-1/2 -translate-x-1/2' :
            position === 'bottom' ? 'bottom-full -mb-1 left-1/2 -translate-x-1/2' :
            position === 'left' ? 'left-full -ml-1 top-1/2 -translate-y-1/2' :
            'right-full -mr-1 top-1/2 -translate-y-1/2'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;