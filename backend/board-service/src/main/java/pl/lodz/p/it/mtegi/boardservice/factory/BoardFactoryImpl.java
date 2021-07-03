package pl.lodz.p.it.mtegi.boardservice.factory;

import org.springframework.stereotype.Component;
import pl.lodz.p.it.mtegi.boardservice.dto.CreateBoardDto;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class BoardFactoryImpl implements BoardFactory {
    @Override
    public Board createFromDefaultTemplate(CreateBoardDto dto) {
        Board board = new Board();
        dto.putProperties(board);
        int i = 0;
        List<Lane> lanes = new ArrayList<>(
                Arrays.asList(
                        Lane.builder().title("todo").index(++i).board(board).build(),
                        Lane.builder().title("doing").index(++i).board(board).build(),
                        Lane.builder().title("done").index(++i).board(board).build()
                ));
        board.setLanes(lanes);
        board.setCreatedAt(LocalDateTime.now());
        return board;
    }

    @Override
    public Board createFromProgrammaticTemplate(CreateBoardDto dto) {
        Board board = new Board();
        dto.putProperties(board);
        int i = 0;
        List<Lane> lanes = new ArrayList<>(
                Arrays.asList(
                        Lane.builder().title("backlog").index(i).board(board).build(),
                        Lane.builder().title("design").index(++i).board(board).build(),
                        Lane.builder().title("todo").index(++i).board(board).build(),
                        Lane.builder().title("doing").index(++i).board(board).build(),
                        Lane.builder().title("code-review").index(++i).board(board).build(),
                        Lane.builder().title("testing").index(++i).board(board).build(),
                        Lane.builder().title("done").index(++i).board(board).build()
                ));
        board.setLanes(lanes);
        board.setCreatedAt(LocalDateTime.now());
        return board;
    }
}
