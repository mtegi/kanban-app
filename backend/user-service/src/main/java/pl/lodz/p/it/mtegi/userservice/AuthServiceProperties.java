package pl.lodz.p.it.mtegi.userservice;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter @Setter
@ConfigurationProperties("auth-service")
public class AuthServiceProperties {

    private String username;
    private String password;
}
