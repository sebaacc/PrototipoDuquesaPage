package com.dh.msusers.application.service;

import com.dh.msusers.application.utils.UserFieldValidator;
import com.dh.msusers.domain.entities.TokenResponse;
import com.dh.msusers.domain.entities.User;
import com.dh.msusers.domain.entities.UserResponse;
import com.dh.msusers.domain.repositories.IKeycloakRepository;
import com.dh.msusers.domain.services.IKeycloakService;
import com.dh.msusers.exceptions.RestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

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
                .orElseThrow(() -> new RestException(NOT_FOUND, String.format("User with id %s not found", id)));
    }

    @Override
    public Map<String, Object> tokenIntrospect(String token) {
        try {
            return keycloakRepository.tokenIntrospect(token);
        } catch (HttpClientErrorException e) {
            throw new RestException(INTERNAL_SERVER_ERROR, e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new RestException(INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public UserResponse save(User user) {
        UserFieldValidator.validateUserFields(user, true);

        List<User> users = keycloakRepository.findByUsername(user.getUsername());
        if (!users.isEmpty()) {
            throw new RestException(CONFLICT, "Username already exists");
        }

        try {
            return new UserResponse(keycloakRepository.save(user));
        } catch (HttpClientErrorException e) {
            throw new RestException(INTERNAL_SERVER_ERROR, e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new RestException(INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public String verify(String verificationCode) {
        return keycloakRepository.verify(verificationCode);
    }

    @Override
    public TokenResponse login(String username, String password) {
        try {
            return keycloakRepository.login(username, password);
        } catch (HttpClientErrorException e) {
            if (BAD_REQUEST.equals(e.getStatusCode()) || UNAUTHORIZED.equals(e.getStatusCode())) {
                throw new RestException(BAD_REQUEST, "Invalid username or password.");
            }
            throw new RestException(INTERNAL_SERVER_ERROR, e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new RestException(INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public UserResponse patchUpdate(User user, String id) {
        User userToPatch = keycloakRepository.findById(id).stream()
                .findFirst()
                .orElseThrow(() -> new RestException(NOT_FOUND, String.format("User with id %s not found", id)));

        UserFieldValidator.validateUserFields(user, false);

        try {
            return new UserResponse(keycloakRepository.patchUpdate(user, id));
        } catch (HttpClientErrorException e) {
            throw new RestException(INTERNAL_SERVER_ERROR, e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new RestException(INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public void deleteById(String id) {
        keycloakRepository.deleteById(id);
    }
}
