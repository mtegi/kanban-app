import React, { useEffect } from 'react';
import Board from 'react-trello';
import { useTranslation, withTranslation } from 'react-i18next';
import { useAsync } from 'react-async-hook';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainBoardMenu from './menu/MainBoardMenu';
import BoardApi from '../../../api/BoardApi';
import ProgressBar from '../../misc/ProgressBar';
import AsyncStatus from '../../constants/AsyncStatus';
import PopUp from '../../misc/PopUp';
import useEventHandler from './useEventHandler';
import NewCardForm from './custom/NewCardForm';
import Card from './custom/Card';
import { useBoardDispatch } from '../context/BoardContext';

const MainBoardView = () => {
  const { t } = useTranslation(['boards', 'common', 'error']);
  const location = useLocation();
  const boardId = location.state.id;
  const data = useAsync(BoardApi.getBoardDetails, [boardId]);
  const I18nBoard = withTranslation('boards')(Board);
  const username = useSelector((state) => state.auth.token.user_name);
  const handler = useEventHandler(boardId);
  const boardDispatch = useBoardDispatch();

  let handleMessage = () => {};

  useEffect(() => {
    handler.subscribe(handleMessage);
  }, [handleMessage]);

  useEffect(() => {
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
        },
      });
    }
  }, [data.status]);

  const components = {
    NewCardForm,
    Card,
  };

  return (
    <>
      {data.loading && <ProgressBar />}
      {data.error && <PopUp text={t(data.error.message)} />}
      {data.status === AsyncStatus.SUCCESS && (
        <>
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
                if (
                  body.username !== username ||
                  body.type === 'UPDATE_LANES'
                ) {
                  if (body.type === 'UPDATE_BOARD_NAME') {
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
            components={components}
          />
        </>
      )}
    </>
  );
};

export default MainBoardView;
