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
          return <Player key={`T1_${pos}`} pos={pos} color="red" />;
        })}
        {playerList.reverse().map((pos: string) => {
          return <Player key={`T2_${pos}`} pos={pos} color="teal" />;
        })}
      </BottomControl>
    </>
  );
};

export default Board;
