package com.dh.msusers.domain.services;

import com.dh.msusers.domain.entities.TokenResponse;
import com.dh.msusers.domain.entities.User;
import com.dh.msusers.domain.entities.UserResponse;

import java.util.List;
import java.util.Map;

public interface IKeycloakService {
    List<UserResponse> findAll();

    UserResponse findById(String id);

    Map<String, Object> tokenIntrospect(String token);

    String verify(String verificationCode);

    UserResponse save(User user);

    TokenResponse login(String username, String password);

    UserResponse patchUpdate(User user, String id);
}
