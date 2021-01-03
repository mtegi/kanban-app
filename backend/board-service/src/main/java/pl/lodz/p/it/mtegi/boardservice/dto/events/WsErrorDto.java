package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.BoardAction;

@Getter
@Setter
@NoArgsConstructor
public class WsErrorDto {
    public final BoardAction type = BoardAction.ERROR;
    private String message;

    public WsErrorDto(String message){
        setMessage(message);
    }
}
