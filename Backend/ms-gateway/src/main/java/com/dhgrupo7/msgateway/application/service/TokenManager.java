package com.dhgrupo7.msgateway.application.service;

import com.dhgrupo7.msgateway.domain.service.ITokenManager;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenManager implements ITokenManager {

    private static final Map<String, String> blackList = new ConcurrentHashMap<>();

    @Override
    public void addToken(String token) {
        blackList.put(token, token);
    }

    @Override
    public boolean isBlackListed(String token) {
        return blackList.containsKey(token);
    }
}
