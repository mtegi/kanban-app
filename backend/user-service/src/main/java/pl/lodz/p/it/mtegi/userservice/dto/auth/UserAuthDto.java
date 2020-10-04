package pl.lodz.p.it.mtegi.userservice.dto.auth;

import pl.lodz.p.it.mtegi.security.model.ProjectAuthority;
import pl.lodz.p.it.mtegi.security.model.UserAuthData;
import pl.lodz.p.it.mtegi.userservice.model.User;

import java.util.stream.Collectors;

public class UserAuthDto extends UserAuthData {

    public UserAuthDto(User user) {
        init();
        setUsername(user.getUsername());
        setPassword(user.getPassword());
        setAccountNonExpired(user.isActive());
        setEnabled(user.isConfirmed());
        user.getRoles().forEach(role -> authorities.addAll(
                role.getPermissions().stream().map(permission -> new ProjectAuthority(role.getProjectId(), permission.getCode().getValue()))
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
