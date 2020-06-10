import React from 'react';

import Board from './board';

import './app.css';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-300 items-center">
      <Board />
    </div>
  );
};

export default App;
