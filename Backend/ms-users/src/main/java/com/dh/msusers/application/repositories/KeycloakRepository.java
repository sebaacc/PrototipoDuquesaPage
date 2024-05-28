package com.dh.msusers.application.repositories;

import com.dh.msusers.domain.entities.TokenResponse;
import com.dh.msusers.domain.entities.User;
import com.dh.msusers.domain.repositories.IKeycloakRepository;
import com.dh.msusers.infrastructure.mail.IEmailService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static java.util.Objects.isNull;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;

@Slf4j
@Repository
@RequiredArgsConstructor
public class KeycloakRepository implements IKeycloakRepository {

    private final Keycloak keycloak;
    private final ObjectMapper mapper;
    private final IEmailService mailService;
    @Value("${keycloak.realm}")
    private String realm;
    @Value("${keycloak.clientId}")
    private String clientId;
    @Value("${keycloak.clientSecret}")
    private String clientSecret;
    @Value("${keycloak.serverUrl}")
    private String serverUrl;

    @Override
    public List<User> findAll() {
        return keycloak.realm(realm)
                .users()
                .list()
                .stream()
                .map(User::new)
                .toList();
    }

    @Override
    public List<User> findById(String id) {
        UserRepresentation userRepresentation;
        try {
            userRepresentation = keycloak.realm(realm)
                    .users()
                    .get(id)
                    .toRepresentation();
            if (isNull(userRepresentation)) {
                return emptyList();
            }
        } catch (Exception e) {
            return emptyList();
        }

        return singletonList(new User(userRepresentation));
    }

    @Override
    public List<User> findByEmail(String email) {
        return keycloak.realm(realm)
                .users()
                .searchByAttributes("email:" + email)
                .stream()
                .map(User::new)
                .toList();
    }

    @Override
    public List<User> findByUsername(String username) {
        return keycloak.realm(realm)
                .users()
                .search(username)
                .stream()
                .map(User::new)
                .toList();
    }

    @Override
    public Map<String, Object> tokenIntrospect(String token) throws JsonProcessingException {
        String[] splitString = token.split("\\.");
        String payload = splitString[1];
        Base64 base64Url = new Base64(true);
        String body = new String(base64Url.decode(payload));

        return mapper.readValue(body, new TypeReference<>() {
        });
    }

    @Override
    public User save(User user) {
        try {
            RealmResource realmResource = keycloak.realm(realm);
            realmResource.users()
                    .create(setUserRepresentation(new UserRepresentation(), user));

            User userCreated = findByEmail(user.getEmail()).get(0);
            mailService.send(userCreated);
            return userCreated;
        } catch (Exception e) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public TokenResponse login(String username, String password) throws JsonProcessingException {
        String urlLogin = serverUrl + "/realms/" + realm + "/protocol/openid-connect/token";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        params.put("username", singletonList(username));
        params.put("password", singletonList(password));
        params.put("grant_type", singletonList("password"));
        params.put("client_id", singletonList(clientId));
        params.put("client_secret", singletonList(clientSecret));

        HttpEntity<?> requestEntity = new HttpEntity<>(params, headers);

        String response = restTemplate.exchange(urlLogin, POST, requestEntity, String.class).getBody();
        return mapper.readValue(response, TokenResponse.class);
    }

    @Override
    public User patchUpdate(User user, String id) {
        List<User> userResponse = findById(id);

        if (CollectionUtils.isEmpty(userResponse)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User with id %s not found", id));
        }

        UserRepresentation userRepresentation = keycloak.realm(realm)
                .users().get(userResponse.get(0).getId())
                .toRepresentation();

        Map<String, List<String>> attributes = userRepresentation.getAttributes();

        if (user.getEmail() != null) {
            userRepresentation.setEmail(user.getEmail());
        }

        if (user.getFirstName() != null) {
            userRepresentation.setFirstName(user.getFirstName());
        }

        if (user.getEmail() != null) {
            userRepresentation.setEmail(user.getEmail());
        }

        if (user.getLastName() != null) {
            userRepresentation.setLastName(user.getLastName());
        }

        if (user.getPassword() != null) {
            userRepresentation.setCredentials(Collections.singletonList(updatePassword(user.getPassword())));
        }

        userRepresentation.setAttributes(attributes);

        keycloak.realm(realm)
                .users()
                .get(userResponse.get(0).getId())
                .update(userRepresentation);

        return new User(userRepresentation);
    }

    private UserRepresentation setUserRepresentation(UserRepresentation userRepresentation, User user) {
        userRepresentation.setFirstName(user.getFirstName());
        userRepresentation.setLastName(user.getLastName());

        userRepresentation.setEmail(user.getEmail());
        userRepresentation.setUsername(user.getUsername());
        userRepresentation.setEnabled(true);

        userRepresentation.setCredentials(singletonList(updatePassword(user.getPassword())));
        return userRepresentation;
    }

    private CredentialRepresentation updatePassword(String password) {
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);
        credential.setTemporary(false);
        return credential;
    }
}
