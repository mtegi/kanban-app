package pl.lodz.p.it.mtegi.security;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;

import java.util.Map;

public class TokenConverter extends DefaultAccessTokenConverter {
    public TokenConverter() {
        super();
        setUserTokenConverter(new AuthConverter());
    }
    @Override
    public OAuth2Authentication extractAuthentication(Map<String, ?> claims) {
        OAuth2Authentication authentication = super.extractAuthentication(claims);
        authentication.setDetails(claims);
        return authentication;
    }
}
