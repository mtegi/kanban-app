package pl.lodz.p.it.mtegi.userservice.dto.auth;

import pl.lodz.p.it.mtegi.common.security.model.BoardAuthority;
import pl.lodz.p.it.mtegi.common.security.model.UserAuthData;
import pl.lodz.p.it.mtegi.userservice.model.User;

import java.util.stream.Collectors;

public class UserAuthDto extends UserAuthData {

    public UserAuthDto(User user) {
        init();
        setUsername(user.getUsername());
        setPassword(user.getPassword());
        setAccountNonLocked(user.isActive());
        setEnabled(user.isConfirmed());
        setAuthorities(user.getRoles().stream().map(role -> new BoardAuthority(role.getBoardId(), role.getRole())).collect(Collectors.toList()));
        if(user.getEmail() != null) {
            additionalInformation.put("email", user.getEmail());
        }
        String nameKey = "name";
        if(user.getFirstName() != null && user.getLastName() != null) {
            additionalInformation.put(nameKey, user.getFirstName() + " " + user.getLastName());
        } else if(user.getFirstName() != null) {
            additionalInformation.put(nameKey, user.getFirstName());
        } else if(user.getLastName() != null){
            additionalInformation.put(nameKey, user.getLastName());
        } else {
            additionalInformation.put(nameKey, null);
        }
    }
}
