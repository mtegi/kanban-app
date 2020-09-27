package pl.lodz.p.it.mtegi.projectservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.util.UriComponentsBuilder;

@EnableEurekaClient
@SpringBootApplication
public class ProjectServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectServiceApplication.class, args);
    }

    @Bean
    public UriComponentsBuilder uriComponentsBuilder() {
        return  UriComponentsBuilder.newInstance();
    }

}
