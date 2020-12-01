package pl.lodz.p.it.mtegi.userservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.common.dto.AddRoleDto;
import pl.lodz.p.it.mtegi.userservice.model.Role;
import pl.lodz.p.it.mtegi.userservice.model.User;
import pl.lodz.p.it.mtegi.userservice.repository.RoleRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final UserService userService;
    private final RoleRepository repository;

    @Override
    public void addRole(AddRoleDto dto) {
        User user = userService.findByUsername(dto.getUsername());
        Role role = Role.builder().boardId(dto.getBoardId()).user(user).role(dto.getRole()).build();
        repository.save(role);
    }
}
