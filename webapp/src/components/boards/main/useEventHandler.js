import useWebSockets from '../../../api/useWebSockets';

const useEventHandler = (boardId) => {
  const ws = useWebSockets();

  const onCardAdd = (card, laneId) => {
    ws.send(`/${boardId}/card/add`, {
      laneId,
      card,
    });
  };

  const onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
    ws.send(`/${boardId}/card/move`, {
      fromLaneId,
      toLaneId,
      cardId,
      index,
    });
  };

  const onCardDelete = (cardId, laneId) => {
    ws.send(`/${boardId}/card/delete`, {
      cardId,
      laneId,
    });
  };

  const onLaneUpdate = (laneId, data) => {
    ws.send(`/${boardId}/lane/update`, {
      laneId,
      data,
    });
  };

  const onBoardOpen = () => {
    ws.send(`/${boardId}/board/open`);
  };

  const onFavourite = (favourite) => {
    ws.send(`/${boardId}/board/favourite`, { favourite });
  };

  const onNameUpdate = (name) => {
    ws.send(`/${boardId}/board/name`, { name });
  };

  const subscribe = (handleMessage) => {
    if (handleMessage.toString() !== '() => {}') {
      ws.subscribe(`/board/${boardId}`, handleMessage);
    }
  };

  const onLaneAdd = (data) => {
    ws.send(`/${boardId}/lane/add`, data);
  };

  const onLaneDelete = (laneId) => {
    ws.send(`/${boardId}/lane/delete`, { laneId });
  };

  const onLaneDragEnd = (removedIndex, addedIndex, payload) => {
    ws.send(`/${boardId}/lane/move`, {
      fromIndex: removedIndex,
      toIndex: addedIndex,
      laneId: payload.id,
    });
  };

  return {
    onCardAdd,
    subscribe,
    onCardMoveAcrossLanes,
    onCardDelete,
    onLaneUpdate,
    onBoardOpen,
    onFavourite,
    onNameUpdate,
    onLaneAdd,
    onLaneDelete,
    onLaneDragEnd,
  };
};

export default useEventHandler;
