package com.dhgrupo7.msgateway.domain.service;

public interface ITokenManager {
    void addToken(String token);
    boolean isBlackListed(String token);
}
