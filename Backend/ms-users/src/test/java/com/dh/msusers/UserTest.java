package com.dh.msusers;

import com.dh.msusers.domain.entities.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.keycloak.representations.idm.UserRepresentation;

import static org.assertj.core.api.Assertions.assertThat;

class UserTest {




    @Test
    void testConstructorWithUserRepresentation() {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setId("123");
        userRepresentation.setFirstName("John");
        userRepresentation.setLastName("Doe");
        userRepresentation.setEmail("john.doe@example.com");
        userRepresentation.setUsername("johndoe");

        User user = new User(userRepresentation);

        assertThat(user.getId()).isEqualTo("123");
        assertThat(user.getFirstName()).isEqualTo("John");
        assertThat(user.getLastName()).isEqualTo("Doe");
        assertThat(user.getEmail()).isEqualTo("john.doe@example.com");
        assertThat(user.getUsername()).isEqualTo("johndoe");
        assertThat(user.getPassword()).isNull(); // Password is not set by the constructor
    }
}
