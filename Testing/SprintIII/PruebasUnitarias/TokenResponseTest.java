package com.dh.msusers;

import com.dh.msusers.domain.entities.TokenResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TokenResponseTest {

    @Test
    void testSerialization() throws Exception {
        TokenResponse tokenResponse = TokenResponse.builder()
                .accessToken("testAccessToken")
                .expiresIn("3600")
                .refreshExpiresIn("7200")
                .refreshToken("testRefreshToken")
                .tokenType("Bearer")
                .notBeforePolicy("0")
                .sessionState("sessionState")
                .scope("read write")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(tokenResponse);

        assertThat(json).contains("\"access_token\":\"testAccessToken\"");
        assertThat(json).doesNotContain("\"expires_in\":\"3600\"");
        assertThat(json).doesNotContain("\"refresh_expires_in\":\"7200\"");
        assertThat(json).doesNotContain("\"refresh_token\":\"testRefreshToken\"");
        assertThat(json).doesNotContain("\"token_type\":\"Bearer\"");
        assertThat(json).doesNotContain("\"not_before_policy\":\"0\"");
        assertThat(json).doesNotContain("\"session_state\":\"sessionState\"");
        assertThat(json).doesNotContain("\"scope\":\"read write\"");
    }

    @Test
    void testDeserialization() throws Exception {
        String json = "{\"access_token\":\"testAccessToken\"}";

        ObjectMapper objectMapper = new ObjectMapper();
        TokenResponse tokenResponse = objectMapper.readValue(json, TokenResponse.class);

        assertThat(tokenResponse.getAccessToken()).isEqualTo("testAccessToken");
        assertThat(tokenResponse.getExpiresIn()).isNull();
        assertThat(tokenResponse.getRefreshExpiresIn()).isNull();
        assertThat(tokenResponse.getRefreshToken()).isNull();
        assertThat(tokenResponse.getTokenType()).isNull();
        assertThat(tokenResponse.getNotBeforePolicy()).isNull();
        assertThat(tokenResponse.getSessionState()).isNull();
        assertThat(tokenResponse.getScope()).isNull();
    }
}