package pl.lodz.p.it.mtegi.authservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import pl.lodz.p.it.mtegi.authservice.model.UserAuth;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping(value = "/users-auth/{username}")
    UserAuth findByUserName(@PathVariable String username);
}
