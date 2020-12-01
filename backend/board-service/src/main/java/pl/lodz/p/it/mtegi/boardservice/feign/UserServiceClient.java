package pl.lodz.p.it.mtegi.boardservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import pl.lodz.p.it.mtegi.common.dto.AddRoleDto;


@FeignClient(name = "user-service")
public interface UserServiceClient {

    @PostMapping("/users-auth/roles/add")
    void addRole(AddRoleDto dto);
}
