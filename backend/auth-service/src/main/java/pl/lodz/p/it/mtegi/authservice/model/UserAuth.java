package pl.lodz.p.it.mtegi.authservice.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Map;

@Getter
@Setter
public class UserAuth implements UserDetails {

    private String username;
    private String password;
    private boolean accountNonExpired;
    private boolean enabled;
    private Collection<ProjectAuthority> authorities;
    private Map<String, Object> additionalInformation;

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
