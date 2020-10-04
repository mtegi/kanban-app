package pl.lodz.p.it.mtegi.common.security.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class UserAuthData {

    protected String username;
    protected String password;
    protected boolean accountNonLocked;
    protected boolean enabled;
    protected Collection<ProjectAuthority> authorities;
    protected Map<String, Object> additionalInformation;

    protected void init() {
        authorities = new ArrayList<>();
        additionalInformation = new HashMap<>();
    }
}
