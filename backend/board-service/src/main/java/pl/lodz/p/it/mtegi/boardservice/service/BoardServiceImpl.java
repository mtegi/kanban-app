package pl.lodz.p.it.mtegi.boardservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.boardservice.dto.CreateBoardDto;
import pl.lodz.p.it.mtegi.boardservice.dto.UsersBoardListDto;
import pl.lodz.p.it.mtegi.boardservice.factory.BoardFactory;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;
import pl.lodz.p.it.mtegi.boardservice.repository.BoardMemberRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.BoardRepository;

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
        }).collect(Collectors.toList());
    }
}