package pl.lodz.p.it.mtegi.boardservice.dto.details;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.common.dto.CommonResponseDto;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class BoardDetailsDto extends CommonResponseDto<Board> {
    private Long id;
    private String name;
    private String color;
    private boolean favourite;
    private List<LaneDetailsDto> lanes;

    @Override
    public void fillProperties(Board entity) {
        super.fillProperties(entity);
        setLanes(entity.getLanes().stream().map(lane -> {
            LaneDetailsDto dto = new LaneDetailsDto();
            dto.fillProperties(lane);
            return dto;
        }).collect(Collectors.toList()));
        lanes.sort(Comparator.comparing(LaneDetailsDto::getIndex));
        lanes.forEach(lane -> lane.getCards().sort(Comparator.comparing(CardDetailsDto::getIndex)));
    }
}
