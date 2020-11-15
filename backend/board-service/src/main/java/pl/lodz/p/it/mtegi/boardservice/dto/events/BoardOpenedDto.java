package pl.lodz.p.it.mtegi.boardservice.dto.events;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardOpenedDto {
    private Long boardId;
    private String username;
}
