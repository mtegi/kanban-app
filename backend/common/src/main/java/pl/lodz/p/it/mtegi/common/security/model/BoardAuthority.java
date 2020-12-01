package pl.lodz.p.it.mtegi.common.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardAuthority implements GrantedAuthority {
    private Long boardId;
    private Role role;

    @JsonIgnore
    @Override
    public String getAuthority() {
        return role.name();
    }
}
