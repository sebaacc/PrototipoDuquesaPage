package com.example.msCart.internal.infrastructure.feign;

import feign.Request;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.loadbalancer.core.RandomLoadBalancer;
import org.springframework.cloud.loadbalancer.core.ReactorLoadBalancer;
import org.springframework.cloud.loadbalancer.core.ServiceInstanceListSupplier;
import org.springframework.cloud.loadbalancer.support.LoadBalancerClientFactory;
import org.springframework.cloud.openfeign.loadbalancer.LoadBalancerFeignRequestTransformer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class FeignConfiguration {

    @Bean
    public LoadBalancerFeignRequestTransformer transformer() {
        return new LoadBalancerFeignRequestTransformer() {

            @Override
            public Request transformRequest(Request request, ServiceInstance instance) {
                Map<String, Collection<String>> headers = new HashMap<>(request.headers());
                headers.put("X-ServiceId", Collections.singletonList(instance.getServiceId()));
                headers.put("X-InstanceId", Collections.singletonList(instance.getInstanceId()));
                return Request.create(request.httpMethod(), request.url(), headers, request.body(), request.charset(),
                        request.requestTemplate());
            }
        };
    }
}