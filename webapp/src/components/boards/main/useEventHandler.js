import useWebSockets from '../../../api/useWebSockets';

const useEventHandler = (boardId) => {
  const ws = useWebSockets();

  const onCardAdd = (card, laneId) => {
    console.log('ADD_CARD', card);
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

  const subscribe = (handleMessage) => {
    if (handleMessage.toString() !== '() => {}') {
      ws.subscribe(`/board/${boardId}`, handleMessage);
    }
  };

  return {
    onCardAdd,
    subscribe,
    onCardMoveAcrossLanes,
    onCardDelete,
    onLaneUpdate,
    onBoardOpen,
    onFavourite,
  };
};

export default useEventHandler;
