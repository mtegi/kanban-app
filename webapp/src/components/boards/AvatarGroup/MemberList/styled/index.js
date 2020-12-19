import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import { DialogContentWrapper } from '../../../main/custom/styled';

export const MemberListWrapper = styled(DialogContentWrapper)`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: 20rem;
`;

export const MemberWrapper = styled(Row)`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: lightgray;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  align-items: center;
  padding: 1rem;
`;

export const MemberName = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.main};;
`;
