package com.dh.msusers.domain.repositories;

import com.dh.msusers.domain.entities.TokenResponse;
import com.dh.msusers.domain.entities.User;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Map;

public interface IKeycloakRepository {
    List<User> findAll();

    List<User> findById(String id);

    List<User> findByEmail(String email);

    List<User> findByUsername(String username);

    Map<String, Object> tokenIntrospect(String token) throws JsonProcessingException;

    User save(User user);

    TokenResponse login(String username, String password) throws JsonProcessingException;

    User patchUpdate(User user, String id);
}
