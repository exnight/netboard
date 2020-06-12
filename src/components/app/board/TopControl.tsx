import React from 'react';

import { resetAllPositions } from './util/helper';

const TopControl: React.FC = () => {
  return (
    <div className="w-full h-12 flex justify-center">
      <button type="button" onClick={resetAllPositions}>
        Reset Pos
      </button>
    </div>
  );
};

export default TopControl;
