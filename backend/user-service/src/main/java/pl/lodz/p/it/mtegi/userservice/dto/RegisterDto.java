package pl.lodz.p.it.mtegi.userservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.userservice.model.User;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class RegisterDto {
    @NotBlank
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    @NotBlank
    private String password;

    public void putProperties(User entity) {
        entity.setUsername(getUsername());
        entity.setEmail(getEmail());
        entity.setFirstName(getFirstName());
        entity.setLastName(getFirstName());
        entity.setPassword(password);
    }
}
