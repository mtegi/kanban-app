package pl.lodz.p.it.mtegi.boardservice.dto.report;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BoardReportDto {
    private int open;
    private int closed;
    List<MemberTaskNumberDto> memberTasks;
}
