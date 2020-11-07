package pl.lodz.p.it.mtegi.boardservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.Inet4Address;
import java.util.Arrays;
import java.util.Collections;

@EnableEurekaClient
@SpringBootApplication
public class BoardServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoardServiceApplication.class, args);
    }

    @Bean
    @RequestScope
    public UriComponentsBuilder uriComponentsBuilder()  {
        try {
            return  UriComponentsBuilder.newInstance().scheme("https").host(Inet4Address.getLocalHost().getHostAddress());
        } catch (Exception e){
            e.printStackTrace();
        }
        return UriComponentsBuilder.newInstance();
    }

    @Bean
    public MessageConverter jsonMessageConverter(){
        return new MappingJackson2MessageConverter();
    }

    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        source.registerCorsConfiguration("/tutorialspoint-websocket/**", configuration);
        return new CorsFilter(source);
    }
}
