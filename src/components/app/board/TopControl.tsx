import React, { useContext } from 'react';

import { CoorContext } from './util/CoorContext';
import { resetAllCoor } from './util/helper';

const TopControl: React.FC = () => {
  const { setCoorState } = useContext(CoorContext);

  return (
    <div className="w-full h-12 flex justify-center">
      <button type="button" onClick={() => resetAllCoor(setCoorState)}>
        Clear All Positions
      </button>
    </div>
  );
};

export default TopControl;
