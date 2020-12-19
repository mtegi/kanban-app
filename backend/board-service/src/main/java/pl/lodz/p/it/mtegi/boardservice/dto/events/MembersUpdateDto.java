package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.BoardAction;
import pl.lodz.p.it.mtegi.common.dto.BoardMemberDetailsDto;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MembersUpdateDto {
    public final BoardAction type = BoardAction.UPDATE_MEMBERS;
    private Long boardId;
    private List<BoardMemberDetailsDto> members;
}
