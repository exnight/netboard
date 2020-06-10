import React from 'react';

import TopControl from './TopController';
import Court from './Court';
import BottomControl from './BottomController';
import Player from './Player';

const playerList = ['GS', 'GA', 'WA', 'C', 'WD', 'GD', 'GK'];

const Board: React.FC = () => {
  return (
    <>
      <TopControl />
      <Court />
      <BottomControl>
        {playerList.map((pos: string) => {
          return (
            <Player
              key={`T1_${pos}`}
              pos={pos}
              circleColor="text-red-300"
              textColor="text-red-800"
            />
          );
        })}
        {playerList.reverse().map((pos: string) => {
          return (
            <Player
              key={`T2_${pos}`}
              pos={pos}
              circleColor="text-teal-300"
              textColor="text-teal-800"
            />
          );
        })}
      </BottomControl>
    </>
  );
};

export default Board;
