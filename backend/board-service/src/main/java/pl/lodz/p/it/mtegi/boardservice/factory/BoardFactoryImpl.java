package pl.lodz.p.it.mtegi.boardservice.factory;

import org.springframework.stereotype.Component;
import pl.lodz.p.it.mtegi.boardservice.dto.CreateBoardDto;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class BoardFactoryImpl implements BoardFactory {
    @Override
    public Board createFromDefaultTemplate(CreateBoardDto dto) {
        Board board = new Board();
        dto.putProperties(board);
        int seq = 0;
        List<Lane> lanes = new ArrayList<>(
                Arrays.asList(
                        Lane.builder().sequence(seq).name("backlog").build(),
                        Lane.builder().sequence(++seq).name("design").build(),
                        Lane.builder().sequence(++seq).name("todo").build(),
                        Lane.builder().sequence(++seq).name("doing").build(),
                        Lane.builder().sequence(++seq).name("code-review").build(),
                        Lane.builder().sequence(++seq).name("testing").build(),
                        Lane.builder().sequence(++seq).name("done").build()
                ));
        board.setLanes(lanes);
        board.setFavourite(false);
        return board;
    }
}
