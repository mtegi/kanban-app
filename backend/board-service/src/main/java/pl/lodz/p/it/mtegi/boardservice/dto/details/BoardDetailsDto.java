package pl.lodz.p.it.mtegi.boardservice.dto.details;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;
import pl.lodz.p.it.mtegi.common.dto.BoardMemberDetailsDto;
import pl.lodz.p.it.mtegi.common.dto.CommonResponseDto;

import java.time.LocalDateTime;
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
    private LocalDateTime createdAt;
    private String token;
    private List<LaneDetailsDto> lanes;
    private List<BoardMemberDetailsDto> members;

    public void fillProperties(BoardMember entity) {
        super.fillProperties(entity.getBoard());
        setToken(entity.getBoard().getInviteToken().getValue());
        setFavourite(entity.isFavourite());
        setLanes(entity.getBoard().getLanes().stream().map(lane -> {
            LaneDetailsDto dto = new LaneDetailsDto();
            dto.fillProperties(lane);
            return dto;
        }).collect(Collectors.toList()));
        lanes.sort(Comparator.comparing(LaneDetailsDto::getIndex));
        lanes.forEach(lane -> lane.getCards().sort(Comparator.comparing(CardDetailsDto::getIndex)));
    }
}
