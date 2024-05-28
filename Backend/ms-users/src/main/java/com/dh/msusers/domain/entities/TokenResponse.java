package com.dh.msusers.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TokenResponse implements Serializable {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonIgnore
    @JsonProperty("expires_in")
    private String expiresIn;

    @JsonIgnore
    @JsonProperty("refresh_expires_in")
    private String refreshExpiresIn;

    @JsonIgnore
    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonIgnore
    @JsonProperty("token_type")
    private String tokenType;

    @JsonIgnore
    @JsonProperty("not_before_policy")
    private String notBeforePolicy;

    @JsonIgnore
    @JsonProperty("session_state")
    private String sessionState;

    @JsonIgnore
    private String scope;

}
