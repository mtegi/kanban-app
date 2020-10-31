package pl.lodz.p.it.mtegi.boardservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;
import pl.lodz.p.it.mtegi.common.dto.CommonResponseDto;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UsersBoardListDto extends CommonResponseDto<Board> {
    private long id;
    private String name;
    private String color;
    private boolean favourite;
    private LocalDateTime lastOpened;

    public void fillProperties(BoardMember member) {
        super.fillProperties(member.getBoard());
        setLastOpened(member.getLastOpened());
    }
}
