package com.dh.msusers.application.service;

import com.dh.msusers.domain.entities.utils.UserFieldValidator;
import com.dh.msusers.domain.entities.TokenResponse;
import com.dh.msusers.domain.entities.User;
import com.dh.msusers.domain.entities.UserResponse;
import com.dh.msusers.domain.repositories.IKeycloakRepository;
import com.dh.msusers.domain.services.IKeycloakService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

import static java.util.Objects.nonNull;
import static org.springframework.http.HttpStatus.*;

@Service
@RequiredArgsConstructor
public class KeycloakService implements IKeycloakService {

    private final IKeycloakRepository keycloakRepository;

    @Override
    public List<UserResponse> findAll() {
        return keycloakRepository.findAll().stream()
                .map(UserResponse::new)
                .toList();
    }

    @Override
    public UserResponse findById(String id) {
        return keycloakRepository.findById(id).stream()
                .findFirst()
                .map(UserResponse::new)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, String.format("User with id %s not found", id)));
    }

    @Override
    public Map<String, Object> tokenIntrospect(String token) {
        try {
            return keycloakRepository.tokenIntrospect(token);
        } catch (HttpClientErrorException e) {
            throw new ResponseStatusException(e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public UserResponse save(User user) {
        UserFieldValidator.validateUserFields(user);

        List<User> users = keycloakRepository.findByUsername(user.getUsername());
        if (!users.isEmpty()) {
            throw new ResponseStatusException(CONFLICT, "Username already exists");
        }

        try {
            return new UserResponse(keycloakRepository.save(user));
        } catch (HttpClientErrorException e) {
            throw new ResponseStatusException(e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public TokenResponse login(String username, String password) {
        try {
            return keycloakRepository.login(username, password);
        } catch (HttpClientErrorException e) {
            throw new ResponseStatusException(e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public UserResponse patchUpdate(User user, String id) {
        User userToPatch = keycloakRepository.findById(id).stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, String.format("User with id %s not found", id)));

        if (nonNull(user.getFirstName()) && UserFieldValidator.isValidName(user.getFirstName())) {
            userToPatch.setFirstName(user.getFirstName());
        }

        if (nonNull(user.getLastName()) && UserFieldValidator.isValidName(user.getLastName())) {
            userToPatch.setLastName(user.getLastName());
        }

        if (nonNull(user.getEmail()) && UserFieldValidator.isValidEmail(user.getEmail())) {
            userToPatch.setEmail(user.getEmail());
        }

        if (nonNull(user.getPassword()) && UserFieldValidator.isValidPassword(user.getPassword())) {
            userToPatch.setPassword(user.getPassword());
        }

        try {
            return new UserResponse(keycloakRepository.patchUpdate(userToPatch, id));
        } catch (HttpClientErrorException e) {
            throw new ResponseStatusException(e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
