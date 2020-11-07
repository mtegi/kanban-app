package pl.lodz.p.it.mtegi.boardservice.dto.details;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;
import pl.lodz.p.it.mtegi.common.dto.CommonResponseDto;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class LaneDetailsDto extends CommonResponseDto<Lane> {
    private Long id;
    private String title;
    private Integer index;
    private Integer taskLimit;
    private List<CardDetailsDto> cards;

    @Override
    public void fillProperties(Lane entity) {
        super.fillProperties(entity);
        setCards(entity.getCards().stream().map(card -> {
            CardDetailsDto dto = new CardDetailsDto();
            dto.fillProperties(card);
            return dto;
        }).collect(Collectors.toList()));
    }
}
