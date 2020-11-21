package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.BoardAction;
import pl.lodz.p.it.mtegi.common.dto.CommonRequestDto;

@Getter
@Setter
@NoArgsConstructor
public class BoardNameDto extends CommonRequestDto<Board> {
    public final BoardAction type = BoardAction.UPDATE_BOARD_NAME;
    private Long boardId;
    private String username;
    private String name;
}
