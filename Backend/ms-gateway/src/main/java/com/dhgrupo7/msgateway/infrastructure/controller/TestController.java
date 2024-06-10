package com.dhgrupo7.msgateway.infrastructure.controller;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/admin")
    public Map<String, String> admin(Principal principal) {
        return Map.of("message", "Hello admin, " + ((JwtAuthenticationToken) principal).getTokenAttributes().get("family_name"));
    }
}
