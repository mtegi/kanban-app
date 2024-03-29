package pl.lodz.p.it.mtegi.userservice;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import pl.lodz.p.it.mtegi.common.security.CommonResourceServerConfig;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@EnableResourceServer
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceServerConfig extends CommonResourceServerConfig {

    private final AuthProperties authProperties;

    public class SecuredControllerFilter implements Filter {
        private boolean checkAuthServiceBasicAuth(String authHeader)
        {
            try {
                String base64Credentials = authHeader.substring("Basic".length()).trim();
                byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
                String credentials = new String(credDecoded, StandardCharsets.UTF_8);
                return credentials.equals(authProperties.getUsername() + ":" + authProperties.getPassword());
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
    public FilterRegistrationBean<SecuredControllerFilter> authControllerFilter(){
        FilterRegistrationBean<SecuredControllerFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new SecuredControllerFilter());
        registrationBean.addUrlPatterns("/users-secured/*");
        return registrationBean;
    }
}
