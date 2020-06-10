import React, { useState } from 'react';

import TopControl from './TopController';
import Court from './Court';
import BottomControl from './BottomController';
import Player from './Player';

import ItemTypes from './util/ItemTypes';
import { DragItem } from './util/BoardInterface';

const players: { [key: string]: DragItem } = {
  GS: { type: ItemTypes.PLAYER, id: 'GS', left: 0, top: 0 },
  GA: { type: ItemTypes.PLAYER, id: 'GA', left: 0, top: 0 },
  WA: { type: ItemTypes.PLAYER, id: 'WA', left: 0, top: 0 },
  C: { type: ItemTypes.PLAYER, id: 'C', left: 0, top: 0 },
  WD: { type: ItemTypes.PLAYER, id: 'WD', left: 0, top: 0 },
  GD: { type: ItemTypes.PLAYER, id: 'GD', left: 0, top: 0 },
  GK: { type: ItemTypes.PLAYER, id: 'GK', left: 0, top: 0 },
};

interface PlayerState {
  [key: string]: DragItem;
}

const Board: React.FC = () => {
  const [playerState, setPlayerState] = useState<PlayerState>(players);

  return (
    <>
      <TopControl />
      <Court updateState={setPlayerState} />
      <BottomControl>
        {Object.keys(playerState).map((id: string) => {
          const player = playerState[id];
          return <Player key={`${id}`} player={player} />;
        })}
      </BottomControl>
    </>
  );
};

export default Board;
