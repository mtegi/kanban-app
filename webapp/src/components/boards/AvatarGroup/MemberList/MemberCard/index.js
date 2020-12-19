import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import PersonIcon from '@material-ui/icons/Person';
import GradeIcon from '@material-ui/icons/Grade';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Badge from '@material-ui/core/Badge';
import { MemberName, MemberWrapper } from '../styled';

const MemberCard = ({ member }) => {
  const { t } = useTranslation('boards');
  return (
    <MemberWrapper>
      <Col md="auto">
        <PersonIcon fontSize="large" />
      </Col>
      {member.role !== 'OWNER' && (
      <Col md="auto">
        <MemberName>{member.name}</MemberName>
      </Col>
      )}
      {member.role === 'OWNER' && (
        <Badge badgeContent={
          <Tooltip title={t('owner')} placement="top">
            <GradeIcon style={{ color: 'gold' }} />
          </Tooltip>}
        >
          <Col md="auto">
            <MemberName>{member.name}</MemberName>
          </Col>
        </Badge>
      )}
    </MemberWrapper>
  );
};

MemberCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired
};

export default MemberCard;
