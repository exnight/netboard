import React from 'react';

import { resetAllCoor } from './util/helper';

const TopControl: React.FC = () => {
  return (
    <div className="w-full h-12 flex justify-center">
      <button type="button" onClick={resetAllCoor}>
        Reset Pos
      </button>
    </div>
  );
};

export default TopControl;
