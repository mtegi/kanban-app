import { useState } from 'react';
import useWebSockets from '../../../api/useWebSockets';

const useEventHandler = (boardId, username) => {
  const [eventBus, setEventBus] = useState(null);
  const ws = useWebSockets();

  const onCardAdd = (card, laneId) => {
    ws.send('/add', { username, laneId, card: { ...card, id: null } });
  };

  const handleDragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    console.log(
      'card drag',
      cardId,
      sourceLaneId,
      targetLaneId,
      position,
      cardDetails
    );
  };
  return { onCardAdd, handleDragEnd, setEventBus };
};

export default useEventHandler;
