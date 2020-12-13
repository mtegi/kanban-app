package pl.lodz.p.it.mtegi.boardservice.factory;

import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.InviteToken;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public interface InviteTokenFactory {
    InviteToken generateNew(Board board) throws NoSuchAlgorithmException, InvalidKeyException;
}
