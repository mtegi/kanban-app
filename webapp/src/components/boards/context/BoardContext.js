import React from 'react';

const BoardStateContext = React.createContext();
const BoardDispatchContext = React.createContext();

function boardReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_BOARD_NAME': {
      return { ...state, name: action.payload };
    }
    case 'SET_ALL': {
      return action.payload;
    }
    case 'TOGGLE_FAVOURITE': {
      return { ...state, favourite: !state.favourite };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// eslint-disable-next-line react/prop-types
function BoardProvider({ children }) {
  const [state, dispatch] = React.useReducer(boardReducer, {
    name: '',
    favourite: false,
    color: '#ff7f50',
  });
  return (
    <BoardStateContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
}
function useBoardState() {
  const context = React.useContext(BoardStateContext);
  if (context === undefined) {
    throw new Error('useBoardState must be used within a BoardProvider');
  }
  return context;
}
function useBoardDispatch() {
  const context = React.useContext(BoardDispatchContext);
  if (context === undefined) {
    throw new Error('useBoardDispatch must be used within a BoardProvider');
  }
  return context;
}
export { BoardProvider, useBoardState, useBoardDispatch };
