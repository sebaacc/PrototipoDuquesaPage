package com.dh.msusers;

import com.dh.msusers.domain.entities.User;
import com.dh.msusers.domain.entities.UserResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserResponseTest {

    @Test
    void testSerialization() throws Exception {
        UserResponse userResponse = UserResponse.builder()
                .id("123")
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .username("johndoe")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(userResponse);

        assertThat(json).contains("\"id\":\"123\"");
        assertThat(json).contains("\"first_name\":\"John\"");
        assertThat(json).contains("\"last_name\":\"Doe\"");
        assertThat(json).contains("\"email\":\"john.doe@example.com\"");
        assertThat(json).contains("\"username\":\"johndoe\"");
    }

    @Test
    void testDeserialization() throws Exception {
        String json = "{\"id\":\"123\",\"first_name\":\"John\",\"last_name\":\"Doe\",\"email\":\"john.doe@example.com\",\"username\":\"johndoe\"}";

        ObjectMapper objectMapper = new ObjectMapper();
        UserResponse userResponse = objectMapper.readValue(json, UserResponse.class);

        assertThat(userResponse.id()).isEqualTo("123");
        assertThat(userResponse.firstName()).isEqualTo("John");
        assertThat(userResponse.lastName()).isEqualTo("Doe");
        assertThat(userResponse.email()).isEqualTo("john.doe@example.com");
        assertThat(userResponse.username()).isEqualTo("johndoe");
    }

    @Test
    void testConstructorWithUser() {
        User user = User.builder()
                .id("123")
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .username("johndoe")
                .password("password")
                .build();

        UserResponse userResponse = new UserResponse(user);

        assertThat(userResponse.id()).isEqualTo("123");
        assertThat(userResponse.firstName()).isEqualTo("John");
        assertThat(userResponse.lastName()).isEqualTo("Doe");
        assertThat(userResponse.email()).isEqualTo("john.doe@example.com");
        assertThat(userResponse.username()).isEqualTo("johndoe");
    }
}
