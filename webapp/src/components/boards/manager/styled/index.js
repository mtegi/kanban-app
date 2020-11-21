import styled, { css } from 'styled-components';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FolderIcon from '@material-ui/icons/Folder';

const iconStyle = css`
  font-size: 75% !important;
  margin-left: 1rem;
`;

export const StyledAccessTimeIcon = styled(AccessTimeIcon)`
  ${iconStyle}
`;
export const StyledFavoriteIcon = styled(FavoriteIcon)`
  ${iconStyle}
`;
export const StyledFolderIcon = styled(FolderIcon)`
  ${iconStyle}
`;

export const BoardSectionContainer = styled.div`
  width: 100%;
  min-height: 14rem;
  padding: 0.2rem 0.5rem;
`;

export const Label = styled.span`
  font-size: 3rem;
  font-weight: bold;
  user-select: none;
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-column-gap: 0.7rem;
  grid-row-gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, min-content));
`;

export const BoardManagerMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 0.5rem 0.5rem 0.25rem;
`;

export const BoardManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  min-height: 90vh;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 1rem;
  border: 3px ${(props) => props.theme.palette.secondary.main} solid;
`;
