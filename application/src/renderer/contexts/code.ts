import { createContext } from 'react';

type ICodeContext = {
  code: string;
  setCode: (value: string) => void;
};

const codeContext = createContext<ICodeContext>({
  code: '',
  setCode: () => {},
});

export default codeContext;
