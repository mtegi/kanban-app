package pl.lodz.p.it.mtegi.authservice.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.lodz.p.it.mtegi.authservice.UserServiceProperties;

import javax.ws.rs.core.HttpHeaders;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class FeignInterceptor implements RequestInterceptor {

    private final UserServiceProperties userServiceProperties;

    @Override
    public void apply(RequestTemplate requestTemplate) {
       String basicAuth = "Basic " + Base64.getEncoder().encodeToString((userServiceProperties.getUsername() + ":" + userServiceProperties.getPassword()).getBytes());
       requestTemplate.header(HttpHeaders.AUTHORIZATION, basicAuth);
    }
}