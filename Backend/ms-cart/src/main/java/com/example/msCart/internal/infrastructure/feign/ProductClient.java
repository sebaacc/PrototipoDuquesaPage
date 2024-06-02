package com.example.msCart.internal.infrastructure.feign;

import com.example.msCart.internal.domain.models.Product;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name="MSPRODUCT")
@LoadBalancerClient(name = "MSPRODUCT", configuration = FeignConfiguration.class)
public interface ProductClient {

    @GetMapping("/product/isProductAmountAvailable/{id}/{amount}/{buying}")
    Boolean isProductAvailable(@PathVariable String id, @PathVariable Integer amount, @PathVariable Boolean buying);

    @GetMapping("/product/findMultipleProducts")
    List<Product> findMultipleProducts(@RequestParam("ids") String ids);



}
