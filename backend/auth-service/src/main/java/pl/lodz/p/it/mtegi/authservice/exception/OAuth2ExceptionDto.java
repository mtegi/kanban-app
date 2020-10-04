package pl.lodz.p.it.mtegi.authservice.exception;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;

@JsonSerialize(using = OAuth2ExceptionSerializer.class)
public class OAuth2ExceptionDto extends OAuth2Exception {
    public OAuth2ExceptionDto(String msg) {
        super(msg);
    }
}
