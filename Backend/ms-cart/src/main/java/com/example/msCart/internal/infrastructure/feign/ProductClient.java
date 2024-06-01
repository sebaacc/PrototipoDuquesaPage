package com.example.msCart.internal.infrastructure.feign;

import com.example.msCart.internal.domain.models.Category;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "MSPRODUCT")
@LoadBalancerClient(name = "MSPRODUCT", configuration = FeignConfiguration.class)
public interface ProductClient {

//    @GetMapping("/api/v1/movies/{genre}")
//    ResponseEntity<List<Movie>> getMovieByGenre(@PathVariable String genre);


    @PostMapping("/category/createCategory")
    ResponseEntity<Category> saveCategory(@RequestBody Category category);
}
