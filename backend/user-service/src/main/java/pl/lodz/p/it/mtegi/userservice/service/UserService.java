package pl.lodz.p.it.mtegi.userservice.service;

import pl.lodz.p.it.mtegi.userservice.dto.ActivateDto;
import pl.lodz.p.it.mtegi.userservice.dto.RegisterDto;
import pl.lodz.p.it.mtegi.userservice.dto.UserInfoDto;
import pl.lodz.p.it.mtegi.userservice.model.User;

import java.security.NoSuchAlgorithmException;

public interface UserService {
    void register(RegisterDto registerDto) throws NoSuchAlgorithmException;
    User findByUsername(String username);

    UserInfoDto editAccountDetails(UserInfoDto userInfoDto, String username);
    UserInfoDto getAccountDetails(String username);

    void activate(ActivateDto activateDto) throws NoSuchAlgorithmException;
}
