package pl.lodz.p.it.mtegi.boardservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.Inet4Address;

@EnableEurekaClient
@EnableFeignClients
@SpringBootApplication
@EnableConfigurationProperties({UserServiceProperties.class})
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
}
