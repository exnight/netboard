import React from 'react';

const BottomControl: React.FC = (props) => {
  const { children } = props;
  return (
    <div className="flex w-full h-24 justify-center align-center">
      {children}
    </div>
  );
};

export default BottomControl;
