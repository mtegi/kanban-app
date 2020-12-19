package pl.lodz.p.it.mtegi.userservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.mtegi.common.dto.AddRoleDto;
import pl.lodz.p.it.mtegi.common.dto.BoardMemberDetailsDto;
import pl.lodz.p.it.mtegi.userservice.dto.auth.UserAuthDto;
import pl.lodz.p.it.mtegi.userservice.service.RoleService;
import pl.lodz.p.it.mtegi.userservice.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users-secured")
@RequiredArgsConstructor
public class SecuredUserController {

    private final UserService userService;
    private final RoleService roleService;

    @GetMapping("/{username}")
    public UserAuthDto loadByUsername(@PathVariable String username){
        return new UserAuthDto(userService.findByUsername(username));
    }


    @PostMapping("/{boardId}/members")
    public List<BoardMemberDetailsDto> getBoardMembersDetails(@RequestBody List<String> usernames, @PathVariable Long boardId) {
        return userService.getBoardMembersDetails(usernames, boardId);
    }

    @PostMapping("/roles/add")
    void addRole(@RequestBody AddRoleDto dto) {
        roleService.addRole(dto);
    };
}
