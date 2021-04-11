package pl.lodz.p.it.mtegi.boardservice.dto.details;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Card;
import pl.lodz.p.it.mtegi.common.dto.CommonDto;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CardDetailsDto extends CommonDto<Card> {
    private String id;
    private String title;
    private String description;
    private LocalDateTime deadline;
    private LocalDateTime createdAt;
    private String color;
    private Integer index;
    private Long laneId;
    private List<String> members;

    @Override
    public void fillProperties(Card entity) {
        super.fillProperties(entity);
        setLaneId(entity.getLane().getId());
    }
}
