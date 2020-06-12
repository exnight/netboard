import { createContext } from 'react';

export interface Coordinates {
  [key: string]: [number, number];
}

export const CoorContext = createContext<{
  coorState: Coordinates;
  // eslint-disable-next-line no-empty-pattern
  setCoorState: (newState: {}) => void;
}>({
  coorState: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCoorState: () => {},
});
