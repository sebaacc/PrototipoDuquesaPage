package com.dh.msusers.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class ExceptionControllerHandler {

    @ExceptionHandler(RestException.class)
    public ResponseEntity<Map<String, Object>> handleException(RestException e) {
        return ResponseEntity.status(e.getStatus())
                .body(Map.of("response", e.getResponse()));
    }

}
