package pl.lodz.p.it.mtegi.boardservice.dto.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberTaskNumberDto {
    private String name;
    private int taskNumber;
}
