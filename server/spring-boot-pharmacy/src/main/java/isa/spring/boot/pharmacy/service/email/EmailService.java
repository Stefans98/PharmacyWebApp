package isa.spring.boot.pharmacy.service.email;

import isa.spring.boot.pharmacy.model.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.MailParseException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private Environment env;

    @Async
    public void sendEmailAsync(User user, String subject, String content) throws MailException {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
            message.setContent(content, "text/html;charset=UTF-8");
            helper.setTo("pswfirma8@gmail.com");
            helper.setSubject(subject);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new MailParseException(e);
        }
    }
}
