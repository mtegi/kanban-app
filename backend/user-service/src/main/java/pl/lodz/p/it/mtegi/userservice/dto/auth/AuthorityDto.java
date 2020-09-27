package pl.lodz.p.it.mtegi.userservice.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthorityDto {
    private final Long projectId;
    private final String code;
}
