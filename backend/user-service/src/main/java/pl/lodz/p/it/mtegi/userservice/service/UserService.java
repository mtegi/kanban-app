package pl.lodz.p.it.mtegi.userservice.service;

import pl.lodz.p.it.mtegi.userservice.dto.RegisterDto;
import pl.lodz.p.it.mtegi.userservice.model.User;

public interface UserService {
    void register(RegisterDto registerDto);
    User findByUsername(String username);
}
