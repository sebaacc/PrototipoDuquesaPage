package com.dh.msusers.infrastructure.mail;

import com.dh.msusers.domain.entities.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.concurrent.CompletableFuture;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED;

@Service
@RequiredArgsConstructor
public class MailSenderService implements IEmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${spring.mail.server-mail}")
    private String serverEmail;

    @Value("${spring.mail.link.verify}")
    private String verifyLink;

    @Value("${spring.mail.mail-template}")
    private String mailTemplate;

    @Value("${spring.mail.mail-subject}")
    private String mailSubject;

    @Override
    public void send(User user) {
        CompletableFuture.runAsync(() -> {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper;

            try {
                helper = new MimeMessageHelper(message, MULTIPART_MODE_MIXED_RELATED, UTF_8.name());
                helper.setFrom(serverEmail);
                helper.setTo(user.getEmail());
                Context context = new Context();

                context.setVariable("first_name", user.getFirstName());
                context.setVariable("last_name", user.getLastName());
                context.setVariable("link", verifyLink + user.getId());

                String html = templateEngine.process(mailTemplate, context);

                helper.setText(html, true);
                helper.setSubject(mailSubject);

                mailSender.send(message);

            } catch (MessagingException e) {
                throw new ResponseStatusException(INTERNAL_SERVER_ERROR, e.getMessage());
            }
        });
    }
}
