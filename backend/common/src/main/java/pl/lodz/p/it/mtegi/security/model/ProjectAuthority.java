package pl.lodz.p.it.mtegi.security.model;

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
public class ProjectAuthority implements GrantedAuthority {
    private Long projectId;
    private String code;

    @JsonIgnore
    @Override
    public String getAuthority() {
        return null;
    }
}
