import styled, { css } from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';

export const DialogContentWrapper = styled(DialogContent)`
  min-width: 30rem;
`;

export const BoardWrapper = styled.div`
  background-color: #3179ba;
  overflow-y: hidden;
  padding: 5px;
  color: #393939;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
`;

export const Header = styled.header`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const Section = styled.section`
  background-color: #e3e3e3;
  border-radius: 3px;
  margin: 5px 5px;
  position: relative;
  padding: 10px;
  display: inline-flex;
  height: auto;
  max-height: 90%;
  flex-direction: column;
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  cursor: ${(props) => (props.draggable ? 'grab' : 'auto')};
  width: 70%;
`;

export const RightContent = styled.span`
  width: 30%;
  text-align: right;
  padding-right: 15px;
  font-size: 13px;
`;
export const CardWrapper = styled.article`
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  background-color: ${(props) => props.color};
  position: relative;
  padding: 10px;
  cursor: pointer;
  max-width: 250px;
  margin-bottom: 7px;
  min-width: 230px;
`;

export const MovableCardWrapper = styled(CardWrapper)`
  &:hover {
    filter: brightness(0.8);
    color: #000;
  }
`;

export const CardHeader = styled(Header)`
  padding-bottom: 6px;
  color: #000;
`;

export const CardTitle = styled(Title)`
  font-size: 14px;
`;

export const CardRightContent = styled(RightContent)`
  font-size: 10px;
`;

export const Detail = styled.div`
  font-size: 12px;
  color: #4d4d4d;
  white-space: pre-wrap;
`;

export const DeleteWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: -1px;
  right: 2px;
  cursor: pointer;
`;

export const DelButton = styled.button`
  transition: all 0.5s ease;
  display: inline-block;
  border: none;
  font-size: 8px;
  height: 15px;
  line-height: 1px;
  margin: 0 0 8px;
  padding: 0;
  text-align: center;
  width: 15px;
  background: inherit;
  cursor: pointer;
  opacity: 0;
  ${MovableCardWrapper}:hover & {
    opacity: 1;
  }
`;

export const InlineInputNumber = styled.input`
  overflow-x: hidden; /* for Firefox (issue #5) */
  word-wrap: break-word;
  min-height: 18px;
  max-height: 112px; /* optional, but recommended */
  resize: none;
  width: 100%;
  height: 18px;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  text-align: inherit;
  background-color: transparent;
  box-shadow: none;
  box-sizing: border-box;
  border-radius: 3px;
  border: 0;
  padding: 0 8px;
  outline: 0;
  ${(props) =>
    props.border
  && css`
      &:focus {
        box-shadow: inset 0 0 0 2px #0079bf;
      }
    `} &:focus {
    background-color: white;
  }
`;
