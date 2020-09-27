package pl.lodz.p.it.mtegi.authservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.mtegi.authservice.feign.UserServiceClient;
import pl.lodz.p.it.mtegi.authservice.model.UserAuth;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserServiceClient userService;

    @Override
    public UserAuth loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService.findByUserName(username);
    }
}
