package pl.lodz.p.it.mtegi.boardservice.dto.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDayDto {
    private String day;
    private Integer tasks;
    private Integer totalTasks;

    public TaskDayDto(String day){
        setTasks(0);
        setTotalTasks(0);
    }
}
