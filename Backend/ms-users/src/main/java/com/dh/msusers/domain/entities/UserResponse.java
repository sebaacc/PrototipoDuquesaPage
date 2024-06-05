package com.dh.msusers.domain.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.awt.geom.Point2D;

@Builder
public record UserResponse(String id, @JsonProperty("first_name") String firstName,
                           @JsonProperty("last_name") String lastName, String email, String username,
                           Long phone, Long document, Point2D.Double location,
                           @JsonProperty("location_details") String locationDetails, Boolean enabled) {
    public UserResponse(User user) {
        this(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getUsername(), user.getPhone(), user.getDocument(), user.getLocation(), user.getLocationDetails(),
                user.getEnabled());
    }
}
