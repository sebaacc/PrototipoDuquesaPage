package com.dhgrupo7.msgateway.infrastructure.filters;

import com.dhgrupo7.msgateway.domain.service.ITokenManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Configurations> {

    private final ITokenManager tokenManager;

    @Override
    public GatewayFilter apply(Configurations config) {

        return (exchange, chain) -> {
            if(exchange.getRequest().getHeaders().containsKey("Authorization")) {
                String token = exchange.getRequest().getHeaders().get("Authorization").get(0);
                if(tokenManager.isBlackListed(token.replace("Bearer ", ""))) {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    log.info("[TOKEN BLACKLISTED] -> {}", token);
                    return exchange.getResponse().setComplete();
                }
            }

            return chain.filter(exchange)
                    .then(Mono.fromRunnable(() -> {
                    }));

        };
    }

    public TokenFilter(ITokenManager tokenManager) {
        super(TokenFilter.Configurations.class);
        this.tokenManager = tokenManager;
    }

    public static class Configurations {}
}
