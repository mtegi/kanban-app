import useWebSockets from '../../../api/useWebSockets';

const useEventHandler = (boardId, username) => {
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

  const subscribeToUser = (handleMessage) => ws.subscribe('/user/queue', handleMessage);

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

  const onInviteLinkUpdate = () => {
    ws.send(`/${boardId}/link/reset`);
  };

  const onCardEdit = (card) => {
    ws.send(`/${boardId}/card/update`, {
      card,
    });
  };

  const onLaneEdit = (body) => {
    ws.send(`/${boardId}/lane/update/details`, body);
  };

  return {
    onCardAdd,
    subscribe,
    subscribeToUser,
    onCardMoveAcrossLanes,
    onCardDelete,
    onLaneUpdate,
    onBoardOpen,
    onFavourite,
    onNameUpdate,
    onLaneAdd,
    onLaneDelete,
    onLaneDragEnd,
    onCardEdit,
    onInviteLinkUpdate,
    onLaneEdit,
  };
};

export default useEventHandler;
