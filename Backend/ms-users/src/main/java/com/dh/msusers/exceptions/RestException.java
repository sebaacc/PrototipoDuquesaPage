package com.dh.msusers.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RestException extends RuntimeException {

    private final HttpStatus status;
    private final Object response;

    public RestException(HttpStatus status, Object response) {
        this.status = status;
        this.response = response;
    }
}
