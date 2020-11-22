package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.model.BoardAction;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;
import pl.lodz.p.it.mtegi.common.dto.CommonDto;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LaneAddedDto extends CommonDto<Lane> {
    public final BoardAction type = BoardAction.UPDATE_LANES;
    private String username;
    private Long boardId;
    private List<LaneDetailsDto> lanes;
}
