package pl.lodz.p.it.mtegi.authservice.util;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;

import java.util.Map;


public class TokenConverter extends DefaultAccessTokenConverter {
    public TokenConverter() {
        super();
        setUserTokenConverter(new AuthConverter());
    }

    /*@Override
    public Map<String, ?> convertAccessToken(OAuth2AccessToken token, OAuth2Authentication authentication) {
        Map<String, Object> response = (Map<String, Object>) super.convertAccessToken(token, authentication);
        OAuth2Request clientToken = authentication.getOAuth2Request();
        if (clientToken.getAuthorities() != null && !clientToken.getAuthorities().isEmpty()) {
            response.put("authorities", clientToken.getAuthorities());
        }
        return response;
    }*/

    @Override
    public OAuth2Authentication extractAuthentication(Map<String, ?> claims) {
        OAuth2Authentication authentication = super.extractAuthentication(claims);
        authentication.setDetails(claims);
        return authentication;
    }
}
