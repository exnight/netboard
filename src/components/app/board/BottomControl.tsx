import React from 'react';

const BottomControl: React.FC = (props) => {
  const { children } = props;
  return (
    <div className="w-full h-24 flex justify-center align-center">
      {children}
    </div>
  );
};

export default BottomControl;
