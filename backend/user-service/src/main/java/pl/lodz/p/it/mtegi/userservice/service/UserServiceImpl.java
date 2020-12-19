package pl.lodz.p.it.mtegi.userservice.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.common.dto.BoardMemberDetailsDto;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;
import pl.lodz.p.it.mtegi.common.messaging.AMQP;
import pl.lodz.p.it.mtegi.common.messaging.dto.AccountConfirmationMessage;
import pl.lodz.p.it.mtegi.common.messaging.dto.AccountRegistrationMessage;
import pl.lodz.p.it.mtegi.userservice.dto.ActivateDto;
import pl.lodz.p.it.mtegi.userservice.dto.RegisterDto;
import pl.lodz.p.it.mtegi.userservice.dto.UserInfoDto;
import pl.lodz.p.it.mtegi.userservice.exception.UserError;
import pl.lodz.p.it.mtegi.userservice.model.Role;
import pl.lodz.p.it.mtegi.userservice.model.Status;
import pl.lodz.p.it.mtegi.userservice.model.User;
import pl.lodz.p.it.mtegi.userservice.repository.UserRepository;
import pl.lodz.p.it.mtegi.userservice.utils.TokenUtils;
import pl.lodz.p.it.mtegi.userservice.utils.Validator;

import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final Validator validator;
    private final RabbitTemplate rabbitTemplate;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void register(RegisterDto registerDto) throws NoSuchAlgorithmException {
        User newUser = new User();
        registerDto.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        registerDto.putProperties(newUser);
        validator.validateUserForRegister(newUser);
        newUser.setStatus(Status.ACTIVE);
        newUser.setConfirmed(false);
        repository.save(newUser);
        AccountRegistrationMessage message = new AccountRegistrationMessage(newUser.getUsername(), newUser.getEmail(), TokenUtils.createUserConfirmationToken(newUser), registerDto.getLocale());
        rabbitTemplate.convertAndSend(AMQP.EXCHANGES.ACCOUNTS, AMQP.KEYS.REGISTER, message);
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

    @Override
    public void activate(ActivateDto activateDto) throws NoSuchAlgorithmException {
        User user = findByUsername(activateDto.getUsername());
        if(user.isConfirmed()){
            throw new ApplicationException(UserError.USER_ALREADY_CONFIRMED);
        }
        TokenUtils.checkUserConfirmationToken(user, activateDto.getToken());
        user.setConfirmed(true);
        repository.save(user);
        AccountConfirmationMessage message = new AccountConfirmationMessage(user.getUsername(), user.getEmail(), activateDto.getLocale());
        rabbitTemplate.convertAndSend(AMQP.EXCHANGES.ACCOUNTS, AMQP.KEYS.ACCOUNT_CONFIRM, message);
    }

    @Override
    public List<BoardMemberDetailsDto> getBoardMembersDetails(List<String> usernames, Long boardId) {
        List<User> users = repository.findUsersByUsernameIn(usernames);
        return users.stream().map(user -> {
            BoardMemberDetailsDto dto = new BoardMemberDetailsDto();
            if(user.getFirstName() != null && user.getLastName() != null){
                dto.setName(user.getFirstName() + " " + user.getLastName());
            } else {
                dto.setName(user.getUsername());
            }
            Optional<Role> roleOptional = user.getRoles().stream().filter(role -> role.getBoardId().equals(boardId)).findFirst();
            roleOptional.ifPresent(role -> dto.setRole(role.getRole().name()));
            return dto;
        }).collect(Collectors.toList());
    }
}
