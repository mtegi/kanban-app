package pl.lodz.p.it.mtegi.boardservice.factory;

import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.InviteToken;

public interface InviteTokenFactory {
    InviteToken generateNew(Board board);
}
