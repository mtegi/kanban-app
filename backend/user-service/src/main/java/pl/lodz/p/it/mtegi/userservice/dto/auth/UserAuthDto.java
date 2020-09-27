package pl.lodz.p.it.mtegi.userservice.dto.auth;

import lombok.Getter;
import lombok.Setter;
import pl.lodz.p.it.mtegi.userservice.model.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
public class UserAuthDto {

    private String username;
    private String password;
    private boolean accountNonExpired;
    private boolean enabled;
    private Collection<AuthorityDto> authorities;
    private Map<String, Object> additionalInformation;

    private void init() {
        authorities = new ArrayList<>();
        additionalInformation = new HashMap<>();
    }

    public UserAuthDto(User user) {
        init();
        setUsername(user.getUsername());
        setPassword(user.getPassword());
        setAccountNonExpired(user.isActive());
        setEnabled(user.isConfirmed());
        user.getRoles().forEach(role -> authorities.addAll(
                role.getPermissions().stream().map(permission -> new AuthorityDto(role.getProjectId(), permission.getCode().getValue()))
                        .collect(Collectors.toList())
        ));
        if(user.getEmail() != null) {
            additionalInformation.put("email", user.getEmail());
        }
        if(user.getFirstName() != null && user.getLastName() != null) {
            additionalInformation.put("name", user.getFirstName() + " " + user.getLastName());
        }
    }
}
