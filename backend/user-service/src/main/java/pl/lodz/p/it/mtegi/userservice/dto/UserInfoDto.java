package pl.lodz.p.it.mtegi.userservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.userservice.model.User;

@Getter
@Setter
@NoArgsConstructor
public class UserInfoDto {

    private String username;
    private String email;
    private String firstName;
    private String lastName;

    public void putProperties(User entity) {
        entity.setUsername(getUsername());
        entity.setEmail(getEmail());
        entity.setFirstName(getFirstName());
        entity.setLastName(getLastName());
    }

    public void fillProperties(User entity) {
        setEmail(entity.getEmail());
        setFirstName(entity.getFirstName());
        setLastName(entity.getLastName());
        setUsername(entity.getUsername());
    }
}
