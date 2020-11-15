package pl.lodz.p.it.mtegi.boardservice;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import pl.lodz.p.it.mtegi.common.security.CommonResourceServerConfig;

@EnableResourceServer
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceServerConfig extends CommonResourceServerConfig {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers(
                        "/board/**",
                        "/api/**",
                        "/ws")
                .authenticated()
                .anyRequest().permitAll();
    }
}
