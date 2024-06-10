package com.dhgrupo7.msgateway.infrastructure.security.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RequiredArgsConstructor
public class KeycloakGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private static final String ROLES = "roles";
    private static final String CLAIM_REALM_ACCESS = "realm_access";
    private final Converter<Jwt, Collection<GrantedAuthority>> defaultAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();


    public Collection<GrantedAuthority> convert(Jwt source) {
        Stream<String> roles = Optional.ofNullable(source.getClaimAsMap(CLAIM_REALM_ACCESS))
                .map(realmAccess -> (List<String>) realmAccess.get(ROLES))
                .orElse(Collections.emptyList())
                .stream()
                .map(role -> "ROLE_" + role);

        Stream<String> scopes = Arrays.stream(Optional.ofNullable(source.getClaimAsString("scope"))
                        .orElse("")
                        .split(" ")).toList()
                .stream()
                .map(scope -> "SCOPE_" + scope);

        Stream<String> audiences = Optional.ofNullable(source.getClaimAsStringList("aud"))
                .orElse(Collections.emptyList())
                .stream()
                .map(audience -> "AUD_" + audience);

        Stream<String> groups = Optional.ofNullable(source.getClaimAsStringList("groups"))
                .orElse(Collections.emptyList())
                .stream()
                .map(group -> "GROUP_" + group.substring(1));

        Collection<GrantedAuthority> authorities = Stream.concat(Stream.concat(roles, groups), Stream.concat(scopes, audiences))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        log.info("[AUTHORITIES] -> {}", authorities);

        return authorities;
    }

}
