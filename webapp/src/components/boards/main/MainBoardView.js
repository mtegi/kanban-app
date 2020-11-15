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

const MainBoardView = () => {
  const { t } = useTranslation(['boards', 'common', 'error']);
  const location = useLocation();
  const boardId = location.state.id;
  const data = useAsync(BoardApi.getBoardDetails, [boardId]);
  const I18nBoard = withTranslation('boards')(Board);
  const username = useSelector((state) => state.auth.token.user_name);
  const handler = useEventHandler(boardId);

  let handleMessage = () => {};

  useEffect(() => {
    handler.subscribe(handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    setTimeout(handler.onBoardOpen, 1000);
  }, []);

  return (
    <>
      {data.loading && <ProgressBar />}
      {data.error && <PopUp text={t(data.error.message)} />}
      {data.status === AsyncStatus.SUCCESS && (
        <>
          <MainBoardMenu
            color={data.result.color}
            name={data.result.name}
            favourite={data.result.favourite}
            handler={handler}
          />
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
                if (body.username !== username) {
                  handle.publish(body);
                } else {
                  console.log('event by self', body);
                }
              };
            }}
            onCardAdd={handler.onCardAdd}
            onCardMoveAcrossLanes={handler.onCardMoveAcrossLanes}
            onCardDelete={handler.onCardDelete}
            onLaneUpdate={handler.onLaneUpdate}
          />
        </>
      )}
    </>
  );
};

export default MainBoardView;
