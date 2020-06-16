import React, { useEffect, useState } from 'react';

import TopControl from './TopControl';
import Court from './Court';
import BottomControl from './BottomControl';

import { CoorContext, Coordinates } from './util/CoorContext';

const T1Players = ['GS', 'GA', 'WA', 'C', 'WD', 'GD', 'GK'];
const T2Players = [...T1Players].reverse();

let initCoorState: Coordinates = {};
const figLocal = localStorage.getItem('figState');

if (figLocal) {
  initCoorState = JSON.parse(figLocal);
} else {
  T1Players.forEach((pos) => {
    initCoorState[`T1_${pos}`] = [0, 0];
    initCoorState[`T2_${pos}`] = [0, 0];
  });

  initCoorState.ball = [0, 0];
}

const Board: React.FC = () => {
  const [coorState, setCoorState] = useState(initCoorState);
  const coorProviderValue = { coorState, setCoorState };

  useEffect(() => {
    localStorage.setItem('figState', JSON.stringify(coorState));
  }, [coorState]);

  return (
    <div className="h-full flex flex-col container items-center">
      <CoorContext.Provider value={coorProviderValue}>
        <TopControl />
        <Court />
        <BottomControl players={[T1Players, T2Players]} />
      </CoorContext.Provider>
    </div>
  );
};

export default Board;
