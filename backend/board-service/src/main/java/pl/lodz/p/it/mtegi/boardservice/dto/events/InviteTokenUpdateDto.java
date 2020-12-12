package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.BoardAction;

@Getter
@Setter
@NoArgsConstructor
public class InviteTokenUpdateDto {
    public final BoardAction type = BoardAction.UPDATE_INVITE_TOKEN;
    private String username;
    private Long boardId;
    private String token;
}
