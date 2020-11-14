package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.BoardAction;

@Getter
@Setter
@NoArgsConstructor
public class CardMovedDto {
    public final BoardAction type = BoardAction.MOVE_CARD;
    private String username;
    private Long fromLaneId;
    private Long toLaneId;
    private String cardId;
    private Integer index;
}

