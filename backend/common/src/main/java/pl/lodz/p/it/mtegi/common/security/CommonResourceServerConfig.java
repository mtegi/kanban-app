package pl.lodz.p.it.mtegi.common.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import pl.lodz.p.it.mtegi.common.security.model.ProjectAuthority;

public class CommonResourceServerConfig extends ResourceServerConfigurerAdapter {
    public interface ProjectPermissions {
        String READ = "PROJECT_READ";
        String WRITE = "PROJECT_WRITE";
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer config) {
        config.tokenServices(tokenServices());
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().anyRequest().permitAll();
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setAccessTokenConverter( authExtractor() );
        converter.setSigningKey("secret");
        return converter;
    }

    @Primary
    @Bean
    public DefaultTokenServices tokenServices() {
        DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
        defaultTokenServices.setTokenStore(tokenStore());
        defaultTokenServices.setSupportRefreshToken(true);
        return defaultTokenServices;
    }

    @Bean
    public TokenConverter authExtractor() {
        return new TokenConverter();
    }

    public static class SecurityService  {
        private boolean checkProjectPermission(Long id, String permission, GrantedAuthority authority) {
            ProjectAuthority projectAuthority = ((ProjectAuthority) authority);
            return projectAuthority.getProjectId().equals(id) && projectAuthority.getCode().equals(permission);
        }

        public boolean projectRead(Long projectId, Authentication authentication) {
            return authentication.getAuthorities().stream().anyMatch(grantedAuthority -> checkProjectPermission(projectId, CommonResourceServerConfig.ProjectPermissions.READ, grantedAuthority));
        }

        public boolean projectWrite(Long projectId, Authentication authentication) {
            return authentication.getAuthorities().stream().anyMatch(grantedAuthority -> checkProjectPermission(projectId, ProjectPermissions.WRITE, grantedAuthority));
        }

    }

    @Bean
    public SecurityService checkPermission() {
        return new SecurityService();
    }
}
