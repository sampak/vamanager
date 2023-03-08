import { createContext } from 'react';
import { Acars } from '../../main/simConnect/typings';
import { Pirep } from '@shared/base/Pirep';

export interface IAcars {
  pirep: Pirep;
  acars: Acars;
  trackerId: string;
  distance: number;
}

type IAcarsContext = {
  acars: IAcars | null;
  setAcars: (acars: IAcars | null) => void;
};

const AcarsContext = createContext<IAcarsContext>({
  acars: null,
  setAcars: () => {},
});

export default AcarsContext;
