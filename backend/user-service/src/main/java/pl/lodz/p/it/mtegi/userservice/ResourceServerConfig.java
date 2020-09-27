package pl.lodz.p.it.mtegi.userservice;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.UserAuthenticationConverter;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import pl.lodz.p.it.mtegi.userservice.model.ProjectAuthority;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

@EnableResourceServer
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    public interface ProjectPermissions {
        String READ = "PROJECT_READ";
        String WRITE = "PROJECT_WRITE";
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer config) {
        config.tokenServices(tokenServices());
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource())
        .and().authorizeRequests()
                .antMatchers("/users-auth/**").permitAll()
                .anyRequest().authenticated();;
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

    @Bean
    @Primary
    public DefaultTokenServices tokenServices() {
        DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
        defaultTokenServices.setTokenStore(tokenStore());
        defaultTokenServices.setSupportRefreshToken(true);
        return defaultTokenServices;
    }

    private static class AuthConverter implements UserAuthenticationConverter {

        @Override
        public Map<String, ?> convertUserAuthentication(Authentication authentication) {
            Map<String, Object> response = new LinkedHashMap();
            response.put("user_name", authentication.getName());
            if (authentication.getAuthorities() != null && !authentication.getAuthorities().isEmpty()) {
                response.put("authorities", authentication.getAuthorities());
            }

            return response;
        }

        @Override
        public Authentication extractAuthentication(Map<String, ?> map) {
            if (map.containsKey("user_name")) {
                Object principal = map.get("user_name");
                Collection<? extends GrantedAuthority> authorities = this.getAuthorities(map);
                return new UsernamePasswordAuthenticationToken(principal, "N/A", authorities);
            } else {
                return null;
            }
        }

        private Collection<? extends GrantedAuthority> getAuthorities(Map<String, ?> map) {
            if (!map.containsKey("authorities")) {
                return null;
            } else {
                Object authorities = map.get("authorities");
                if (authorities instanceof String) {
                    return AuthorityUtils.commaSeparatedStringToAuthorityList((String)authorities);
                } else if (authorities instanceof Collection) {
                    ObjectMapper mapper = new ObjectMapper();
                    return mapper.convertValue(authorities, new TypeReference<Collection<ProjectAuthority>>() {});
                } else {
                    throw new IllegalArgumentException("Authorities must be either a String or a Collection");
                }
            }
        }
    }

    private static class TokenConverter extends DefaultAccessTokenConverter {
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
            return authentication.getAuthorities().stream().anyMatch(grantedAuthority -> checkProjectPermission(projectId, ProjectPermissions.READ, grantedAuthority));
        }

        public boolean projectWrite(Long projectId, Authentication authentication) {
            return authentication.getAuthorities().stream().anyMatch(grantedAuthority -> checkProjectPermission(projectId, ProjectPermissions.WRITE, grantedAuthority));
        }

    }

    @Bean
    public SecurityService checkPermission() {
        return new SecurityService();
    }

    private final AuthServiceProperties authServiceProperties;

    public class AuthControllerFilter implements Filter {
        private boolean checkAuthServiceBasicAuth(String authHeader)
        {
            try {
                String base64Credentials = authHeader.substring("Basic".length()).trim();
                byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
                String credentials = new String(credDecoded, StandardCharsets.UTF_8);
                return credentials.equals(authServiceProperties.getUsername() + ":" + authServiceProperties.getPassword());
            } catch (Exception e) {
                return false;
            }
        }

        @Override
        public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
            HttpServletRequest req = (HttpServletRequest) servletRequest;
            HttpServletResponse res = (HttpServletResponse) servletResponse;
            if(!checkAuthServiceBasicAuth(req.getHeader(HttpHeaders.AUTHORIZATION))) {
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            } else {
                filterChain.doFilter(req, res);
            }
        }
    }

    @Bean
    public FilterRegistrationBean<AuthControllerFilter> authControllerFilter(){
        FilterRegistrationBean<AuthControllerFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new AuthControllerFilter());
        registrationBean.addUrlPatterns("/users-auth/*");
        return registrationBean;
    }
}
