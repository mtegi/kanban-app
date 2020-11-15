package pl.lodz.p.it.mtegi.boardservice.dto.details;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;
import pl.lodz.p.it.mtegi.common.dto.CommonDto;

@Getter
@Setter
@NoArgsConstructor
public class LaneUpdateDataDto extends CommonDto<Lane> {
    private String title;
}
