package pl.lodz.p.it.mtegi.boardservice;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import pl.lodz.p.it.mtegi.common.security.CommonResourceServerConfig;

@EnableResourceServer
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceServerConfig extends CommonResourceServerConfig {}
