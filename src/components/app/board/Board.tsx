import React, { useMemo, useState } from 'react';

import TopControl from './TopControl';
import Court from './Court';
import BottomControl from './BottomControl';

import { CoorContext, Coordinates } from './util/CoorContext';
import { COOR_PREFIX, getCoorFromLocalStorage } from './util/helper';

const T1Players = ['GS', 'GA', 'WA', 'C', 'WD', 'GD', 'GK'];
const T2Players = [...T1Players].reverse();

const initCoorState: Coordinates = {};

T1Players.forEach((pos) => {
  initCoorState[`T1_${pos}`] = getCoorFromLocalStorage(
    `${COOR_PREFIX}T1_${pos}`
  );
});

T2Players.forEach((pos) => {
  initCoorState[`T2_${pos}`] = getCoorFromLocalStorage(
    `${COOR_PREFIX}T2_${pos}`
  );
});

initCoorState.ball = getCoorFromLocalStorage(`${COOR_PREFIX}ball`);

const Board: React.FC = () => {
  const [coorState, setCoorState] = useState(initCoorState);
  const coorProviderValue = useMemo(() => ({ coorState, setCoorState }), [
    coorState,
    setCoorState,
  ]);

  return (
    <div className="h-screen flex flex-col container">
      <CoorContext.Provider value={coorProviderValue}>
        <TopControl />
        <Court />
        <BottomControl players={[T1Players, T2Players]} />
      </CoorContext.Provider>
    </div>
  );
};

export default Board;
