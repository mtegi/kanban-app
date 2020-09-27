package pl.lodz.p.it.mtegi.userservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.mtegi.userservice.dto.auth.UserAuthDto;
import pl.lodz.p.it.mtegi.userservice.service.UserService;

@RestController
@RequestMapping("/users-auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @GetMapping("/{username}")
    public UserAuthDto loadByUsername(@PathVariable String username){
        return new UserAuthDto(userService.findByUsername(username));
    }
}
