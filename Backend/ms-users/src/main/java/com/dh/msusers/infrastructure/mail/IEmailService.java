package com.dh.msusers.infrastructure.mail;

import com.dh.msusers.domain.entities.User;

public interface IEmailService {
    void send(User user);
}
