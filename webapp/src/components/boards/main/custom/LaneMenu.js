import React from 'react';
import PropTypes from 'prop-types';

import { Popover } from 'react-popopo';

import { CustomPopoverContent, CustomPopoverContainer } from 'react-trello/dist/styles/Base';

import {
  LaneMenuTitle,
  LaneMenuHeader,
  LaneMenuContent,
  DeleteWrapper,
  LaneMenuItem,
  GenDelButton,
  MenuButton,
} from 'react-trello/dist/styles/Elements';
import { useDispatch } from 'react-redux';
import { setEditLane } from '../../../../redux/reducers/actions/editLaneActions';

// eslint-disable-next-line react/prop-types
const LaneMenu = ({ t, onDelete, laneId, cardCount }) => {
  const dispatch = useDispatch();
  return (
    <Popover
      position="bottom"
      PopoverContainer={CustomPopoverContainer}
      PopoverContent={CustomPopoverContent}
      trigger={<MenuButton>⋮</MenuButton>}
    >
      <LaneMenuHeader>
        <LaneMenuTitle>{t('Lane actions')}</LaneMenuTitle>
        <DeleteWrapper>
          <GenDelButton>&#10006;</GenDelButton>
        </DeleteWrapper>
      </LaneMenuHeader>
      <LaneMenuContent>
        <LaneMenuItem onClick={() => dispatch(setEditLane(true, laneId, cardCount))}>
          {t('Edit lane')}
        </LaneMenuItem>
        <LaneMenuItem onClick={onDelete}>{t('Delete lane')}</LaneMenuItem>
      </LaneMenuContent>
    </Popover>
  );
};

export default LaneMenu;

LaneMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
