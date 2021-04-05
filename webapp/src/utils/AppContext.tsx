import React, { createContext, ReactNode, useState } from 'react';

interface ProviderProps {
  children: ReactNode | ReactNode[];
}

interface State {
  boardId: number;
}

interface Patch {
  boardId?: number;
}

export interface ContextType {
  state: State;
  setState(patch: Patch): void;
}

const defaultContext: ContextType = {
  state: {
    boardId: -1,
  },
  setState: () => {},
};

const AppContext: React.Context<ContextType> = createContext<ContextType>(defaultContext);

export const AppContextProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, setState] = useState<State>(defaultContext.state);

  const patchState = (patch: Patch) => setState((prevState) => ({ ...prevState, ...patch }));

  const contextValue = { state, setState: patchState };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContext;
