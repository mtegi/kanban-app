package pl.lodz.p.it.mtegi.boardservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pl.lodz.p.it.mtegi.common.dto.AddRoleDto;
import pl.lodz.p.it.mtegi.common.dto.BoardMemberDetailsDto;

import java.util.Collection;
import java.util.List;


@FeignClient(name = "user-service")
public interface UserServiceClient {

    @PostMapping("/users-secured/roles/add")
    void addRole(AddRoleDto dto);

    @PostMapping( "/users-secured/{boardId}/members")
    List<BoardMemberDetailsDto> getBoardMembersDetails(@RequestBody Collection<String> usernames, @PathVariable Long boardId);
}
