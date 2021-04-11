package pl.lodz.p.it.mtegi.boardservice.dto.report;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskTimeLineDto {
    private String start;
    private List<TaskDayDto> data;

    public TaskTimeLineDto(String start){
        setStart(start);
    }
}
