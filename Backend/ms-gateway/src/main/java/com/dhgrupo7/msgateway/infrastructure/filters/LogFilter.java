package com.dhgrupo7.msgateway.infrastructure.filters;


import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Calendar;

@Slf4j
@Component
public class LogFilter extends AbstractGatewayFilterFactory<LogFilter.Configurations> {

    @Override
    public GatewayFilter apply(Configurations config) {
        return (exchange, chain) -> {
            log.info("[PATH REQUESTED] -> {}",exchange.getRequest().getPath());

            return chain.filter(exchange)
                    .then(Mono.fromRunnable(() -> {
                        log.info("[TIME RESPONSE] -> {}", Calendar.getInstance().getTime());
                    }));

        };
    }

    public LogFilter() {
        super(LogFilter.Configurations.class);
    }

    public static class Configurations {}
}