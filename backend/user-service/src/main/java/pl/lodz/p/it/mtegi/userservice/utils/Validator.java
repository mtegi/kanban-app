package pl.lodz.p.it.mtegi.userservice.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;
import pl.lodz.p.it.mtegi.userservice.exception.UserError;
import pl.lodz.p.it.mtegi.userservice.model.User;
import pl.lodz.p.it.mtegi.userservice.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class Validator {

    private final UserRepository repository;

    public void validateUserForRegister(User user) {
        if(repository.existsByUsername(user.getUsername()))
            throw new ApplicationException(UserError.USERNAME_NOT_UNIQUE);
        if(repository.existsByEmail(user.getEmail()))
            throw new ApplicationException(UserError.EMAIL_NOT_UNIQUE);
    }
}
