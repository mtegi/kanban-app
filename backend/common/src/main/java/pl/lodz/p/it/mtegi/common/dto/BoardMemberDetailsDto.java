package pl.lodz.p.it.mtegi.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardMemberDetailsDto {
    private String name;
    private String username;
    private String role;
}
