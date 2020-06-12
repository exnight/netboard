import React from 'react';

import TopControl from './TopControl';
import Court from './Court';
import BottomControl from './BottomControl';
import Player from './Player';
import Ball from './Ball';

const playerList = ['GS', 'GA', 'WA', 'C', 'WD', 'GD', 'GK'];

const Board: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
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
        <Ball />
        {playerList.reverse().map((pos: string) => {
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
      </BottomControl>
    </div>
  );
};

export default Board;
