package pl.lodz.p.it.mtegi.boardservice.service;


import pl.lodz.p.it.mtegi.boardservice.dto.CreateBoardDto;
import pl.lodz.p.it.mtegi.boardservice.dto.UsersBoardListDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.BoardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.BoardOpenedDto;
import pl.lodz.p.it.mtegi.boardservice.model.Board;

import java.util.List;

public interface BoardService {
    List<Board> findAll();
    Board createFromDefaultTemplate(CreateBoardDto dto, String username);
    List<UsersBoardListDto> getUsersBoardsForManager(String username);
    BoardDetailsDto getBoardDetails(Long id);
    void onBoardOpened(BoardOpenedDto dto);
}
