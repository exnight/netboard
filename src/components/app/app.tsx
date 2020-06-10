import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TopController from './board/TopController';
import BottomController from './board/BottomController';
import Board from './board';

import './app.css';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-300 items-center">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
};

export default App;
