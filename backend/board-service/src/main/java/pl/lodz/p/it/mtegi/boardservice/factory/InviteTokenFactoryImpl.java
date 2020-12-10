package pl.lodz.p.it.mtegi.boardservice.factory;

import org.springframework.stereotype.Component;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.InviteToken;
import pl.lodz.p.it.mtegi.boardservice.utils.BoardUtils;

@Component
public class InviteTokenFactoryImpl implements InviteTokenFactory {
    @Override
    public InviteToken generateNew(Board board) {
        InviteToken token = new InviteToken();
        token.setBoard(board);
        token.setValue(BoardUtils.generateInviteToken(board.getId()));
        return token;
    }
}
