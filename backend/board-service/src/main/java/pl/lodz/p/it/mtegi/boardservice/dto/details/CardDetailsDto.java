package pl.lodz.p.it.mtegi.boardservice.dto.details;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Card;
import pl.lodz.p.it.mtegi.common.dto.CommonDto;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CardDetailsDto extends CommonDto<Card> {
    private String id;
    private String title;
    private String description;
    private LocalDateTime deadline;
    private String color;
    private Integer index;
    private Long laneId;

    @Override
    public void fillProperties(Card entity) {
        super.fillProperties(entity);
        setLaneId(entity.getLane().getId());
    }
}
