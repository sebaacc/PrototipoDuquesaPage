package com.example.msCart.internal.infrastructure.feign;

import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "MSPRODUCT")
@LoadBalancerClient(name = "MSPRODUCT", configuration = FeignConfiguration.class)
public interface ProductClient {
}
