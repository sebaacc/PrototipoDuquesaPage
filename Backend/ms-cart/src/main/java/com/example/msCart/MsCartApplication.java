package com.example.msCart;

import com.example.msCart.internal.domain.models.Category;
import com.example.msCart.internal.infrastructure.feign.ProductClient;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class MsCartApplication {

	public static void main(String[] args) {

		SpringApplication.run(MsCartApplication.class, args);

	}

}
