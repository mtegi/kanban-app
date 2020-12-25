import React from 'react';
import { useBoardState } from '../../context/BoardContext';
import { MemberListWrapper } from './styled';
import MemberCard from './MemberCard';

const MemberList = () => {
  const { members } = useBoardState();
  return (
    <MemberListWrapper>
      {members.map((m) => <MemberCard key={m.username} member={m} />)}
    </MemberListWrapper>
  );
};

export default MemberList;
