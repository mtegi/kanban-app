package pl.lodz.p.it.mtegi.boardservice.dto.details;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.TimeEntry;
import pl.lodz.p.it.mtegi.common.dto.CommonResponseDto;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TimeEntryDetailsDto extends CommonResponseDto<TimeEntry> {
    private String title;
    private LocalDateTime from;
    private LocalDateTime to;
}
