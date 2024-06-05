package com.dh.msusers.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.keycloak.representations.idm.UserRepresentation;

import java.awt.geom.Point2D;
import java.io.Serializable;

import static com.dh.msusers.application.utils.SafeUtils.convertToPoint;
import static com.dh.msusers.application.utils.SafeUtils.getAttribute;
import static org.apache.commons.lang.math.NumberUtils.createLong;

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
    private Long phone;
    private Long document;
    private Point2D.Double location;

    @JsonProperty("location_details")
    private String locationDetails;
    private String verificationCode;
    private Boolean enabled;

    public User(UserRepresentation userRepresentation) {
        this.id = userRepresentation.getId();
        this.firstName = userRepresentation.getFirstName();
        this.lastName = userRepresentation.getLastName();
        this.email = userRepresentation.getEmail();
        this.username = userRepresentation.getUsername();
        this.phone = createLong(getAttribute("phone", userRepresentation));
        this.document = createLong(getAttribute("document", userRepresentation));
        this.location = convertToPoint(getAttribute("location", userRepresentation));
        this.locationDetails = getAttribute("locationDetails", userRepresentation);
        this.verificationCode = getAttribute("verificationCode", userRepresentation);
        this.enabled = userRepresentation.isEnabled();
    }
}
