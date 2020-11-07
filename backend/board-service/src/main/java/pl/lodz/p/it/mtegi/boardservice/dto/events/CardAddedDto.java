package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.dto.details.CardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.model.BoardAction;

@Getter
@Setter
@NoArgsConstructor
public class CardAddedDto {
    public final BoardAction type = BoardAction.ADD_CARD;
    private String username;
    private Long laneId;
    private CardDetailsDto card;
}
