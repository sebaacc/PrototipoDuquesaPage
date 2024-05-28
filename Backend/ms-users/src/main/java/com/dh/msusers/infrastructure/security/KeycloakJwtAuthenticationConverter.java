package com.dh.msusers.infrastructure.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class KeycloakJwtAuthenticationConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt source) {

        Map<String, Object> realmsAccess = (Map<String, Object>) source.getClaims().get("realm_access");

        Stream<String> roles = Optional.ofNullable((List<String>) realmsAccess.get("roles"))
                .orElse(Collections.emptyList())
                .stream()
                .map(role -> "ROLE_" + role);

        Stream<String> scopes = Arrays.stream(Optional.ofNullable((String) source.getClaims().get("scope"))
                        .orElse("")
                        .split(" ")).toList()
                .stream()
                .map(scope -> "SCOPE_" + scope);

        Stream<String> audiences = Optional.ofNullable((List<String>) source.getClaims().get("aud"))
                .orElse(Collections.emptyList())
                .stream()
                .map(audience -> "AUD_" + audience);

        Stream<String> groups = Optional.ofNullable(source.getClaimAsStringList("groups"))
                .orElse(Collections.emptyList())
                .stream()
                .map(group -> "GROUP_" + group.substring(1));

        return Stream.concat(Stream.concat(roles, groups), Stream.concat(scopes, audiences))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

    }
}
