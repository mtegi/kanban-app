package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.common.dto.CommonRequestDto;

@Getter
@Setter
@NoArgsConstructor
public class BoardFavouriteDto extends CommonRequestDto<Board> {
    private Long boardId;
    private String username;
    private boolean favourite;
}
