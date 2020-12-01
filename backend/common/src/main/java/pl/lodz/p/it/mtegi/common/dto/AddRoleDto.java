package pl.lodz.p.it.mtegi.common.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.lodz.p.it.mtegi.common.security.model.Role;

@Getter
@Setter
public class AddRoleDto {
    private String username;
    private Long boardId;
    private Role role;

    public AddRoleDto(){}

    @Builder
    public AddRoleDto(String username, Long boardId, Role role){
        setUsername(username);
        setBoardId(boardId);
        setRole(role);
    }
}
