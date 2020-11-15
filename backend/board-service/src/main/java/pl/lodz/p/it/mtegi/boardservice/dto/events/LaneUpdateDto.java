package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneUpdateDataDto;
import pl.lodz.p.it.mtegi.boardservice.model.BoardAction;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LaneUpdateDto {
    public final BoardAction type = BoardAction.UPDATE_LANES;
    private String username;
    private Long laneId;
    private Long boardId;
    private LaneUpdateDataDto data;
    private List<LaneDetailsDto> lanes;
}
