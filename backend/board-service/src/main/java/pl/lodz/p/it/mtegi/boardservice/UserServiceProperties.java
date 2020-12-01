package pl.lodz.p.it.mtegi.boardservice;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter @Setter
@ConfigurationProperties("user-service")
public class UserServiceProperties {

    private String username;
    private String password;
}
