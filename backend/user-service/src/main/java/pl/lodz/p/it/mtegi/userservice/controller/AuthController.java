package pl.lodz.p.it.mtegi.userservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.mtegi.common.dto.AddRoleDto;
import pl.lodz.p.it.mtegi.userservice.dto.auth.UserAuthDto;
import pl.lodz.p.it.mtegi.userservice.service.RoleService;
import pl.lodz.p.it.mtegi.userservice.service.UserService;

@RestController
@RequestMapping("/users-auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final RoleService roleService;

    @GetMapping("/{username}")
    public UserAuthDto loadByUsername(@PathVariable String username){
        return new UserAuthDto(userService.findByUsername(username));
    }

    @PostMapping("/roles/add")
    void addRole(@RequestBody AddRoleDto dto) {
        roleService.addRole(dto);
    };
}
