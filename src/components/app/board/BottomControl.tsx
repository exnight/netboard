/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useState } from 'react';

import Player from './Player';
import Ball from './Ball';

import { CoorContext } from './util/CoorContext';
import { resetAllCoor } from './util/helper';

interface Props {
  players: [string[], string[]];
}

const toolClassName =
  'w-full px-4 py-2 hover:bg-indigo-500 hover:text-white focus:outline-none';

const baseBtnClassName =
  'focus:outline-none focus:shadow-outline lg:py-2 lg:px-2 md:p-0 border border-gray-400 rounded shadow';

const BottomControl: React.FC<Props> = (props) => {
  const { players } = props;
  const { setCoorState } = useContext(CoorContext);
  const [toolIsOpen, setToolIsOpen] = useState(false);

  return (
    <div className="w-4/5 flex my-4">
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
        <div className="relative">
          {toolIsOpen ? (
            <>
              <button
                type="button"
                aria-label="select tool"
                tabIndex={-1}
                className="fixed w-full h-full inset-0 bg-black opacity-75"
                onClick={() => setToolIsOpen(false)}
                onKeyDown={() => setToolIsOpen(false)}
              />
              <div className="absolute bottom-0 py-1 mb-12 bg-white rounded-lg shadow-xl">
                <button
                  type="button"
                  className={toolClassName}
                  onClick={() => setToolIsOpen(false)}
                >
                  Dashed Arrow
                </button>
                <button
                  type="button"
                  className={toolClassName}
                  onClick={() => setToolIsOpen(false)}
                >
                  Solid Arrow
                </button>
                <button
                  type="button"
                  className={toolClassName}
                  onClick={() => setToolIsOpen(false)}
                >
                  Move
                </button>
              </div>
            </>
          ) : null}

          <button
            type="button"
            onClick={() => setToolIsOpen(!toolIsOpen)}
            className={`relative z-10 text-xs bg-white text-gray-600 hover:bg-gray-500 hover:text-white ${baseBtnClassName}`}
          >
            Select Tool
          </button>
        </div>
        <button
          type="button"
          className={`text-xs bg-white text-red-600 hover:bg-red-500 hover:text-white font-semibold ${baseBtnClassName}`}
        >
          Clear Drawings
        </button>
        <button
          type="button"
          onClick={() => resetAllCoor(setCoorState)}
          className={`text-xs bg-white text-red-600 hover:bg-red-500 hover:text-white font-semibold ${baseBtnClassName}`}
        >
          Reset Positions
        </button>
      </div>
    </div>
  );
};

export default BottomControl;
