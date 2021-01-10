package pl.lodz.p.it.mtegi.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@EnableEurekaClient
@SpringBootApplication
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }


    @Bean
    public CorsWebFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        source.registerCorsConfiguration("/api/**", configuration);
        return new CorsWebFilter(source);
    }

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        String prefix = "/api";
        return builder.routes()
                .route(r -> r.path(prefix + "/oauth/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://auth-service")
                        .id("auth-service"))
                .route(r -> r.path(prefix +"/boards/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://board-service")
                        .id("board-service"))
                .route(r -> r.path(prefix +"/cards/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://board-service")
                        .id("board-service"))
                .route(r -> r.path(prefix +"/lanes/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://board-service")
                        .id("board-service"))
                .route(r -> r.path(prefix +"/time-entries", prefix +"/time-entries/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://board-service")
                        .id("board-service"))
                .route(r -> r.path("/ws/**")
                        .uri("lb://board-service")
                        .id("board-service"))
                .route(r -> r.path(prefix + "/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://user-service")
                        .id("user-service"))
                .build();
    }
}
