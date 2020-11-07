package pl.lodz.p.it.mtegi.boardservice.dto.details;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Card;
import pl.lodz.p.it.mtegi.common.dto.CommonDto;

@Getter
@Setter
@NoArgsConstructor
public class CardDetailsDto extends CommonDto<Card> {
    private Long id;
    private String title;
    private String description;
}
