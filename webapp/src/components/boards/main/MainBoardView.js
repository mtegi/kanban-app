import React, { useEffect } from 'react';
import Board from 'react-trello';
import { useTranslation, withTranslation } from 'react-i18next';
import { useAsync } from 'react-async-hook';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainBoardMenu from './menu/MainBoardMenu';
import BoardApi from '../../../api/BoardApi';
import ProgressBar from '../../misc/ProgressBar';
import AsyncStatus from '../../constants/AsyncStatus';
import PopUp from '../../misc/PopUp';
import useEventHandler from './useEventHandler';
import NewCardForm from './custom/NewCardForm';
import Card from './custom/Card';
import { isBoardAction, isUpdateAction, useBoardDispatch } from '../context/BoardContext';
import EditCardForm from '../EditCardForm';
import { setEditCard } from '../../../redux/reducers/actions/editCardActions';
import LaneHeaderComponent from './custom/LaneHeader';
import EditLaneForm from '../EditLaneForm';
import ControlledPopUp from '../../misc/ControlledPopUp';
import {
  setBoardError,
  setBoardErrorOpen,
} from '../../../redux/reducers/actions/boardErrorActions';
import EditTimeForm from '../EditTimeForm';

const MainBoardView = () => {
  const { t } = useTranslation(['boards', 'common', 'error']);
  const location = useLocation();
  const boardId = location.state.id;
  const data = useAsync(BoardApi.getBoardDetails, [boardId]);
  const I18nBoard = withTranslation('boards')(Board);
  const username = useSelector((state) => state.auth.token.user_name);
  const boardError = useSelector((state) => state.boardError);
  const handler = useEventHandler(boardId, username);
  const boardDispatch = useBoardDispatch();
  const dispatch = useDispatch();

  let handleMessage = () => {};

  const handleUserMessage = (message) => {
    const body = JSON.parse(message.body);
    if (body.type === 'ERROR') {
      data.execute(boardId);
      dispatch(setBoardError(true, body.message));
    }
  };

  useEffect(() => {
    handler.subscribe(handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    handler.subscribeToUser(handleUserMessage);
    setTimeout(handler.onBoardOpen, 1000);
  }, []);

  useEffect(() => {
    if (data.status === AsyncStatus.SUCCESS) {
      boardDispatch({
        type: 'SET_ALL',
        payload: {
          color: data.result.color,
          name: data.result.name,
          favourite: data.result.favourite,
          token: data.result.token,
          members: data.result.members
        },
      });
    }
  }, [data.status]);

  const components = {
    NewCardForm,
    Card,
    LaneHeader: LaneHeaderComponent
  };

  return (
    <>
      {data.loading && <ProgressBar />}
      {data.error && <PopUp text={t(data.error.message)} />}
      {data.status === AsyncStatus.SUCCESS && (
        <>
          <ControlledPopUp open={boardError.open} text={t(boardError.message)} severity="error" setOpen={(open) => dispatch(setBoardErrorOpen(open))} />
          <EditLaneForm onEdit={handler.onLaneEdit} />
          <EditCardForm onEdit={handler.onCardEdit} />
          <EditTimeForm />
          <MainBoardMenu handler={handler} />
          <I18nBoard
            canAddLanes
            editLaneTitle
            editable
            draggable
            data={data.result}
            style={{ backgroundColor: data.result.color }}
            eventBusHandle={(handle) => {
              handleMessage = (message) => {
                const body = JSON.parse(message.body);
                if (body.username !== username || isBoardAction(body.type)) {
                  if (isUpdateAction(body.type)) {
                    boardDispatch(body);
                  } else {
                    console.log('event', body);
                    handle.publish(body);
                  }
                } else {
                  console.log('event by self', body);
                }
              };
            }}
            onCardAdd={handler.onCardAdd}
            onCardMoveAcrossLanes={handler.onCardMoveAcrossLanes}
            onCardDelete={handler.onCardDelete}
            onLaneUpdate={handler.onLaneUpdate}
            onLaneAdd={handler.onLaneAdd}
            onLaneDelete={handler.onLaneDelete}
            handleLaneDragEnd={handler.onLaneDragEnd}
            onCardClick={(cardId) => dispatch(setEditCard(true, cardId))}
            components={components}
          />
        </>
      )}
    </>
  );
};

export default MainBoardView;
