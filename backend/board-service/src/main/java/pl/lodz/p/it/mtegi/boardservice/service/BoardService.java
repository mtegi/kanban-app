package pl.lodz.p.it.mtegi.boardservice.service;


import org.springframework.security.core.Authentication;
import pl.lodz.p.it.mtegi.boardservice.dto.CreateBoardDto;
import pl.lodz.p.it.mtegi.boardservice.dto.UsersBoardListDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.BoardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.*;
import pl.lodz.p.it.mtegi.boardservice.model.Board;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface BoardService {
    List<Board> findAll();
    Board createFromDefaultTemplate(CreateBoardDto dto, String username);
    List<UsersBoardListDto> getUsersBoardsForManager(String username);
    BoardDetailsDto getBoardDetails(String username, Long id);
    void onBoardOpened(BoardOpenedDto dto);
    void onBoardFavourite(BoardFavouriteDto dto);
    BoardNameDto onBoardNameUpdate(BoardNameDto dto);
    InviteTokenUpdateDto onInviteLinkUpdate(InviteTokenUpdateDto dto);
    MembersUpdateDto joinBoard(String token, Authentication authentication);
}
