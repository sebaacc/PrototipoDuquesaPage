package com.dhgrupo7.msgateway.infrastructure.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import reactor.core.publisher.Mono;

@Configuration
@EnableReactiveMethodSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http,
                                                         //ReactiveClientRegistrationRepository clientRegistrationRepository,
                                                         Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter) {

        // * As Client

        /*return http.authorizeExchange(exchanges -> exchanges
                .anyExchange().authenticated())
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .oauth2Login(Customizer.withDefaults())
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler(logoutSuccessHandler(clientRegistrationRepository)))
                .build();*/

        // * As Resource Server

        return http.authorizeExchange(exchanges -> exchanges
                .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .pathMatchers(HttpMethod.POST, "/users/save", "/users/login", "/mspayp/pay/handleWebhook").permitAll()
                .pathMatchers(HttpMethod.GET, "/users/verify").permitAll()
                .pathMatchers("/admin").hasRole("ADMIN") // Example of role-based access control
                .anyExchange().authenticated())
                .csrf(ServerHttpSecurity.CsrfSpec::disable)

                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtSpec -> jwtSpec.jwtAuthenticationConverter(jwtAuthenticationConverter)))
                .build();
    }

    /*@Bean
    public ServerLogoutSuccessHandler logoutSuccessHandler(ReactiveClientRegistrationRepository clientRegistrationRepository) {
        return new OidcClientInitiatedServerLogoutSuccessHandler(clientRegistrationRepository);
    }*/

}
