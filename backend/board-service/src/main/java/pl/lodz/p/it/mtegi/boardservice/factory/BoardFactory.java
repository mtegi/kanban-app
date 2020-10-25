package pl.lodz.p.it.mtegi.boardservice.factory;

import pl.lodz.p.it.mtegi.boardservice.dto.CreateBoardDto;
import pl.lodz.p.it.mtegi.boardservice.model.Board;

public interface BoardFactory {

    Board createFromDefaultTemplate(CreateBoardDto dto);
}
