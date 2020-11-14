import useWebSockets from '../../../api/useWebSockets';

const useEventHandler = (boardId, username) => {
  const ws = useWebSockets();

  const onCardAdd = (card, laneId) => {
    ws.send(`/${boardId}/card/add`, {
      username,
      laneId,
      card,
    });
  };

  const onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
    ws.send(`/${boardId}/card/move`, {
      username,
      fromLaneId,
      toLaneId,
      cardId,
      index,
    });
  };

  const onCardDelete = (cardId, laneId) => {
    ws.send(`/${boardId}/card/delete`, {
      username,
      cardId,
      laneId,
    });
  };

  const subscribe = (handleMessage) => {
    if (handleMessage.toString() !== '() => {}') {
      ws.subscribe(`/board/${boardId}`, handleMessage);
    }
  };

  return { onCardAdd, subscribe, onCardMoveAcrossLanes, onCardDelete };
};

export default useEventHandler;
