package pl.lodz.p.it.mtegi.boardservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.boardservice.dto.CreateBoardDto;
import pl.lodz.p.it.mtegi.boardservice.dto.UsersBoardListDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.BoardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.BoardFavouriteDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.BoardNameDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.BoardOpenedDto;
import pl.lodz.p.it.mtegi.boardservice.exception.BoardError;
import pl.lodz.p.it.mtegi.boardservice.factory.BoardFactory;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;
import pl.lodz.p.it.mtegi.boardservice.repository.BoardMemberRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.BoardRepository;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final BoardFactory boardFactory;
    private final BoardMemberRepository memberRepository;

    @Override
    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    @Override
    public Board createFromDefaultTemplate(CreateBoardDto dto, String username) {
        Board board = boardFactory.createFromDefaultTemplate(dto);
        board.getMembers().add(BoardMember.builder().username(username).board(board).build());
        return boardRepository.save(board);
    }

    @Override
    public List<UsersBoardListDto> getUsersBoardsForManager(String username) {
        return memberRepository.findAllByUsername(username).stream().map(member -> {
            UsersBoardListDto dto = new UsersBoardListDto();
            dto.fillProperties(member);
            return dto;
        }).sorted(Comparator.comparing(UsersBoardListDto::getLastOpened).reversed()).collect(Collectors.toList());
    }

    @Override
    public BoardDetailsDto getBoardDetails(String username, Long id) {
        BoardDetailsDto dto = new BoardDetailsDto();
        dto.fillProperties(findByUsernameAndBoard(username, id));
        return dto;
    }

    @Override
    public void onBoardOpened(BoardOpenedDto dto) {
        memberRepository.findAllByUsername(dto.getUsername()).stream().filter(user -> dto.getBoardId().equals(user.getBoard().getId())).findFirst().ifPresent(boardMember -> boardMember.setLastOpened(LocalDateTime.now()));
    }

    @Override
    public void onBoardFavourite(BoardFavouriteDto dto) {
        BoardMember member = findByUsernameAndBoard(dto.getUsername(), dto.getBoardId());
        member.setFavourite(dto.isFavourite());
        memberRepository.save(member);
    }

    @Override
    public BoardNameDto onBoardNameUpdate(BoardNameDto dto) {
        Board board = findById(dto.getBoardId());
        board.setName(dto.getName());
        boardRepository.save(board);
        return dto;
    }

    public Board findById(Long id) {
        return boardRepository.findById(id).orElseThrow(() -> new ApplicationException(BoardError.NOT_FOUND));
    }

    private BoardMember findByUsernameAndBoard(String username, Long boardId){
        return memberRepository.findFirstByUsernameAndBoard_Id(username, boardId).orElseThrow(() -> new ApplicationException(BoardError.NOT_FOUND));
    }
}
