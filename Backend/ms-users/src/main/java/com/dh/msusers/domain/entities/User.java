package com.dh.msusers.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.keycloak.representations.idm.UserRepresentation;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class User implements Serializable {
    private String id;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    private String email;
    private String username;
    private String password;

    public User(UserRepresentation userRepresentation) {
        this.id = userRepresentation.getId();
        this.firstName = userRepresentation.getFirstName();
        this.lastName = userRepresentation.getLastName();
        this.email = userRepresentation.getEmail();
        this.username = userRepresentation.getUsername();

    }
}
