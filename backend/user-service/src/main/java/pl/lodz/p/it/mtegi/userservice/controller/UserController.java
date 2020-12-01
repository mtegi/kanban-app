package pl.lodz.p.it.mtegi.userservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.mtegi.userservice.dto.ActivateDto;
import pl.lodz.p.it.mtegi.userservice.dto.RegisterDto;
import pl.lodz.p.it.mtegi.userservice.dto.UserInfoDto;
import pl.lodz.p.it.mtegi.userservice.service.RoleService;
import pl.lodz.p.it.mtegi.userservice.service.UserService;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    @PermitAll
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto) throws NoSuchAlgorithmException {
        userService.register(registerDto);
        return ResponseEntity.ok().build();
    }

    @PermitAll
    @PostMapping("/activate")
    public ResponseEntity<?> activateAccount(@Valid @RequestBody ActivateDto activateDto) throws NoSuchAlgorithmException {
        userService.activate(activateDto);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public UserInfoDto meGet(Authentication auth) {
        return userService.getAccountDetails(auth.getName());
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/me")
    public UserInfoDto mePut(@Valid @RequestBody UserInfoDto userInfoDto, Authentication auth) {
        return userService.editAccountDetails(userInfoDto, auth.getName());
    }

}
