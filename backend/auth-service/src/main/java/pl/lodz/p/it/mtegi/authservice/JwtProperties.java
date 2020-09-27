package pl.lodz.p.it.mtegi.authservice;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter @Setter
@ConfigurationProperties("jwt")
public class JwtProperties {

    /**
     * key to sign token with
     */
    private String secret;
}
