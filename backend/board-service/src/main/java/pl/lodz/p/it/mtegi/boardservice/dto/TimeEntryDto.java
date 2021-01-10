package pl.lodz.p.it.mtegi.boardservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.TimeEntry;
import pl.lodz.p.it.mtegi.common.dto.CommonRequestDto;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TimeEntryDto extends CommonRequestDto<TimeEntry> {
    private Long boardId;
    private String cardId;
    private String username;
    private LocalDateTime from;
    private LocalDateTime to;
}
