package com.dh.msusers.infrastructure.controllers;

import com.dh.msusers.application.utils.constants.Endpoints;
import com.dh.msusers.domain.entities.TokenRequest;
import com.dh.msusers.domain.entities.TokenResponse;
import com.dh.msusers.domain.entities.User;
import com.dh.msusers.domain.entities.UserResponse;
import com.dh.msusers.domain.services.IKeycloakService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final IKeycloakService keycloakService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAll() {
        return ResponseEntity.ok(keycloakService.findAll());
    }

    @GetMapping(Endpoints.GET_BY_ID)
    public ResponseEntity<UserResponse> findById(@PathVariable String id) {
        return ResponseEntity.ok(keycloakService.findById(id));
    }

    @GetMapping(Endpoints.TOKEN_INTROSPECT)
    public ResponseEntity<Map<String, Object>> tokenIntrospect(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.replace("Bearer ", "");
        return ResponseEntity.ok(keycloakService.tokenIntrospect(token));
    }

    @GetMapping(Endpoints.VERIFY)
    public void verify(@RequestParam String code, HttpServletResponse response) throws IOException {
        response.sendRedirect(keycloakService.verify(code));
    }

    @PostMapping(Endpoints.SAVE)
    public ResponseEntity<UserResponse> save(@RequestBody User user) {
        return ResponseEntity.ok(keycloakService.save(user));
    }

    @PostMapping(Endpoints.LOGIN)
    public ResponseEntity<TokenResponse> login(@RequestBody TokenRequest tokenRequest) {
        return ResponseEntity.ok(keycloakService.login(tokenRequest.getUsername(), tokenRequest.getPassword()));
    }

    @PatchMapping(Endpoints.PATCH_UPDATE)
    public ResponseEntity<UserResponse> patchUpdate(@RequestBody User user, @PathVariable String id) {
        return ResponseEntity.ok(keycloakService.patchUpdate(user, id));
    }

    @DeleteMapping(Endpoints.DELETE_BY_ID)
    public ResponseEntity<?> deleteById(@PathVariable String id) {
        keycloakService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
