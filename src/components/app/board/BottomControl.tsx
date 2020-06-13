import React, { useContext } from 'react';

import Player from './Player';
import Ball from './Ball';

import { CoorContext } from './util/CoorContext';
import { resetAllCoor } from './util/helper';

interface Props {
  players: [string[], string[]];
}

const BottomControl: React.FC<Props> = (props) => {
  const { players } = props;
  const { setCoorState } = useContext(CoorContext);

  return (
    <div className="w-full flex mt-4">
      <div className="w-1/2 flex flex-col px-8">
        <div className="flex justify-center">
          {players[0].map((pos: string) => {
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
        </div>
        <div className="flex justify-center">
          {players[1].map((pos: string) => {
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
        </div>
      </div>
      <div className="w-1/2 flex px-8 justify-around items-center">
        <Ball />
        <button type="button" onClick={() => resetAllCoor(setCoorState)}>
          Clear All Positions
        </button>
      </div>
    </div>
  );
};

export default BottomControl;
