package pl.lodz.p.it.mtegi.messageservice;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ConfigurationProperties("messaging")
public class MessagingProperties {

    /**
     * SPA app url
     */
    @NotBlank
    private String hostname;

    /**
     * should use secured connection
     */
    private Boolean ssl;

    /**
     * Email
     */
    @Email
    private String email;
}