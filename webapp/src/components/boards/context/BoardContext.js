import React from 'react';

const BoardStateContext = React.createContext();
const BoardDispatchContext = React.createContext();

export const BoardActions = {
  UPDATE_BOARD_NAME: 'UPDATE_BOARD_NAME',
  UPDATE_INVITE_TOKEN: 'UPDATE_INVITE_TOKEN',
  SET_ALL: 'SET_ALL',
  UPDATE_MEMBERS: 'UPDATE_MEMBERS',
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
  UPDATE_CARD: 'UPDATE_CARD',
};

export const isBoardAction = (type) => !!BoardActions[type];

export const isUpdateAction = (type) =>
  type === BoardActions.UPDATE_BOARD_NAME ||
  type === BoardActions.UPDATE_INVITE_TOKEN ||
  type === BoardActions.UPDATE_MEMBERS;

function boardReducer(state, action) {
  switch (action.type) {
    case BoardActions.UPDATE_BOARD_NAME: {
      return { ...state, name: action.name };
    }
    case BoardActions.UPDATE_INVITE_TOKEN: {
      return { ...state, token: action.token };
    }
    case BoardActions.SET_ALL: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case BoardActions.TOGGLE_FAVOURITE: {
      return { ...state, favourite: !state.favourite };
    }
    case BoardActions.UPDATE_MEMBERS: {
      return { ...state, members: action.members };
    }
    case BoardActions.UPDATE_CARD: {
      console.log('update carddd', action, state);
      return {
        ...state,
        updateCard: {
          id: action.card.id,
          version: state.updateCard.version + 1,
        },
      };
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
    token: '',
    members: [{ name: '', username: '', role: '' }],
    updateCard: {
      id: '',
      version: 0,
    },
  });
  return (
    <BoardStateContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>{children}</BoardDispatchContext.Provider>
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
