package com.example.msCart.internal.infrastructure.feign;

import com.example.msCart.internal.domain.models.Category;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="MSPRODUCT")
@LoadBalancerClient(name = "MSPRODUCT", configuration = FeignConfiguration.class)
public interface ProductClient {

    @GetMapping("/category/findCategoryById/{id}")
    Object getCategoryById(@PathVariable String id);


    @PostMapping("/category/createCategory")
    ResponseEntity<Category> saveCategory(@RequestBody Object category);
}
