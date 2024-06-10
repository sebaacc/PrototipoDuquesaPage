package com.dhgrupo7.msgateway.infrastructure.controller;

import com.dhgrupo7.msgateway.domain.service.ITokenManager;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class LogoutController {

    private final ITokenManager tokenManager;

    @PostMapping("/users/logout")
    public Mono<ResponseEntity<?>> logout(ServerHttpRequest request) {
        return Mono.just(Optional.ofNullable(request.getHeaders().getFirst("Authorization"))
                .map(token -> {

                    if(tokenManager.isBlackListed(token.replace("Bearer ", ""))) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                    }
                    tokenManager.addToken(token.replace("Bearer ", ""));
                    return ResponseEntity.ok().body(Map.of("message", "Logout successful"));

                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()));

    }
}
