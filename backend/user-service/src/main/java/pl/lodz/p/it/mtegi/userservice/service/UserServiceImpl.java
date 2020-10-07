package pl.lodz.p.it.mtegi.userservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;
import pl.lodz.p.it.mtegi.userservice.dto.RegisterDto;
import pl.lodz.p.it.mtegi.userservice.dto.UserInfoDto;
import pl.lodz.p.it.mtegi.userservice.exception.UserError;
import pl.lodz.p.it.mtegi.userservice.model.Status;
import pl.lodz.p.it.mtegi.userservice.model.User;
import pl.lodz.p.it.mtegi.userservice.repository.UserRepository;
import pl.lodz.p.it.mtegi.userservice.utils.Validator;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final Validator validator;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void register(RegisterDto registerDto) {
        User newUser = new User();
        registerDto.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        registerDto.putProperties(newUser);
        validator.validateUserForRegister(newUser);
        newUser.setStatus(Status.ACTIVE);
        newUser.setConfirmed(false);
        repository.save(newUser);
    }

    @Override
    public User findByUsername(String username) {
        return repository.findByUsername(username).orElseThrow(() -> new ApplicationException(UserError.NOT_FOUND));
    }

    @Override
    public UserInfoDto editAccountDetails(UserInfoDto userInfoDto, String username) {
        User user = findByUsername(username);
        userInfoDto.putProperties(user);
        user = repository.save(user);
        userInfoDto.fillProperties(user);
        return userInfoDto;
    }

    @Override
    public UserInfoDto getAccountDetails(String username) {
        User user = findByUsername(username);
        UserInfoDto dto = new UserInfoDto();
        dto.fillProperties(user);
        return dto;
    }
}
