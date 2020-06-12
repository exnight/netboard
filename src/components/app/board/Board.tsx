import React, { useMemo, useState } from 'react';

import TopControl from './TopControl';
import Court from './Court';
import BottomControl from './BottomControl';
import Player from './Player';
import Ball from './Ball';

import { CoorContext, Coordinates } from './util/CoorContext';
import { COOR_PREFIX, getCoorFromLocalStorage } from './util/helper';

const playerList = ['GS', 'GA', 'WA', 'C', 'WD', 'GD', 'GK'];

const initCoorState: Coordinates = {};

playerList.forEach((pos) => {
  initCoorState[`T1_${pos}`] = getCoorFromLocalStorage(
    `${COOR_PREFIX}T1_${pos}`
  );
});
playerList.reverse().forEach((pos) => {
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
    <div className="flex flex-col items-center">
      <CoorContext.Provider value={coorProviderValue}>
        <TopControl />
        <Court />
        <BottomControl>
          {playerList.map((pos: string) => {
            return (
              <Player
                key={`T1_${pos}`}
                team={1}
                pos={pos}
                circleColor="text-red-300"
                textColor="text-red-800"
              />
            );
          })}

          {[...playerList].reverse().map((pos: string) => {
            return (
              <Player
                key={`T2_${pos}`}
                team={2}
                pos={pos}
                circleColor="text-teal-300"
                textColor="text-teal-800"
              />
            );
          })}
          {/* <Player
            key="T1_GS"
            team={1}
            pos="GS"
            coorState={coorState['T1_GS']}
            setCoorState={setCoorState}
            circleColor="text-red-300"
            textColor="text-red-800"
          />
          <Player
            key="T2_GK"
            team={2}
            pos="GK"
            coorState={coorState['T2_GK']}
            setCoorState={setCoorState}
            circleColor="text-teal-300"
            textColor="text-teal-800"
          /> */}
          <Ball />
        </BottomControl>
      </CoorContext.Provider>
    </div>
  );
};

export default Board;
