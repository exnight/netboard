import React from 'react';

import Board from './board';

import './app.css';

const App: React.FC = () => {
  return (
    <div className="h-full bg-gray-300">
      <Board />
    </div>
  );
};

export default App;
