package pl.lodz.p.it.mtegi.authservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
public class ProjectAuthority implements GrantedAuthority {
    private Long projectId;
    private String code;

    @JsonIgnore
    @Override
    public String getAuthority() {
        return null;
    }
}
