package pl.lodz.p.it.mtegi.authservice.exception;

import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.common.exceptions.InvalidGrantException;

public class OAuth2ExceptionConverter {
    public OAuth2ExceptionDto convert(Exception exception) {
        if(exception instanceof InvalidGrantException) {
            if("Bad credentials".equals(exception.getMessage())){
                return new OAuth2ExceptionDto("error:login.badCredentials");
            }
            return new OAuth2ExceptionDto("error:login.notActive");
        }
        if(exception instanceof InternalAuthenticationServiceException) {
            return new OAuth2ExceptionDto("error:login.badCredentials");
        }
        return new OAuth2ExceptionDto(exception.getMessage());
    }
}
