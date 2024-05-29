package com.dh.msusers.domain.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record UserResponse(String id, @JsonProperty("first_name") String firstName,
                           @JsonProperty("last_name") String lastName, String email, String username) {
    public UserResponse(User user) {
        this(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getUsername());
    }
}
