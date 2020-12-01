package pl.lodz.p.it.mtegi.authservice.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;
import pl.lodz.p.it.mtegi.common.security.model.BoardAuthority;

import java.util.Collection;
import java.util.Map;

@Getter
@Setter
public class UserAuth implements UserDetails {

    private String username;
    private String password;
    private boolean accountNonLocked;
    private boolean enabled;
    private Collection<BoardAuthority> authorities;
    private Map<String, Object> additionalInformation;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
