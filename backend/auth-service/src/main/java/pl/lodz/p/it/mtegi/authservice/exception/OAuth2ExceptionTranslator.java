package pl.lodz.p.it.mtegi.authservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;
import org.springframework.security.oauth2.provider.error.WebResponseExceptionTranslator;

public class OAuth2ExceptionTranslator implements WebResponseExceptionTranslator<OAuth2Exception> {

    private final OAuth2ExceptionConverter converter;

    public OAuth2ExceptionTranslator() {
        this.converter = new OAuth2ExceptionConverter();
    }

    @Override
    public ResponseEntity<OAuth2Exception> translate(Exception exception) {
        if(exception instanceof OAuth2Exception) {
            OAuth2Exception e = ((OAuth2Exception) exception);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(converter.convert(e));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(converter.convert(exception));
    }
}
