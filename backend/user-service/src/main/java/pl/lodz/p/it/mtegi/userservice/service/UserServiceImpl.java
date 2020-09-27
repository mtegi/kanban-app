package pl.lodz.p.it.mtegi.userservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.userservice.dto.RegisterDto;
import pl.lodz.p.it.mtegi.userservice.exception.UserError;
import pl.lodz.p.it.mtegi.userservice.exception.UserException;
import pl.lodz.p.it.mtegi.userservice.model.Status;
import pl.lodz.p.it.mtegi.userservice.model.User;
import pl.lodz.p.it.mtegi.userservice.repository.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Override
    public void register(RegisterDto registerDto) {
        User newUser = new User();
        registerDto.putProperties(newUser);
        newUser.setStatus(Status.ACTIVE);
        newUser.setConfirmed(false);
        repository.save(newUser);
    }

    @Override
    public User findByUsername(String username) {
        return repository.findByUsername(username).orElseThrow(() -> new UserException(UserError.NOT_FOUND));
    }
}
