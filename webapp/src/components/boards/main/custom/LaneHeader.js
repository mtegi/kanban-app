import React from 'react';
import PropTypes from 'prop-types';
import InlineInput from 'react-trello/dist/widgets/InlineInput';
import { Title, LaneHeader } from 'react-trello/dist/styles/Base';
import LaneMenu from './LaneMenu';
import { RightContent } from './styled';

const LaneHeaderComponent = ({
  updateTitle, canAddLanes, onDelete, onDoubleClick, editLaneTitle,
  // eslint-disable-next-line react/prop-types
  title, titleStyle, labelStyle, t, laneDraggable, id, taskLimit, cards
}) => (
  <LaneHeader onDoubleClick={onDoubleClick} editLaneTitle={editLaneTitle}>
    <Title draggable={laneDraggable} style={titleStyle}>
      {editLaneTitle
        ? <InlineInput value={title} border placeholder={t('placeholder.title')} resize="vertical" onSave={updateTitle} />
        : title
        }
    </Title>
    {taskLimit && (
    <RightContent>
      <span style={labelStyle}>
        {/* eslint-disable-next-line react/prop-types */}
        {cards.length}
        /
        {taskLimit}
      </span>
    </RightContent>
    )}
    {/* eslint-disable-next-line react/prop-types */}
    {canAddLanes && <LaneMenu t={t} onDelete={onDelete} laneId={id} cardCount={cards.length} />}
  </LaneHeader>
);

LaneHeaderComponent.propTypes = {
  updateTitle: PropTypes.func,
  editLaneTitle: PropTypes.bool,
  canAddLanes: PropTypes.bool,
  laneDraggable: PropTypes.bool,
  taskLimit: PropTypes.number,
  title: PropTypes.string,
  id: PropTypes.number,
  onDelete: PropTypes.func,
  onDoubleClick: PropTypes.func,
  t: PropTypes.func.isRequired
};

LaneHeaderComponent.defaultProps = {
  updateTitle: () => {},
  editLaneTitle: false,
  canAddLanes: false,
  laneDraggable: false,
  taskLimit: null,
  title: '',
  id: 0,
  onDelete: () => {},
  onDoubleClick: () => {}
};

export default LaneHeaderComponent;
