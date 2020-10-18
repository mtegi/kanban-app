package pl.lodz.p.it.mtegi.messageservice.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.mtegi.common.messaging.dto.AccountConfirmationMessage;
import pl.lodz.p.it.mtegi.common.messaging.dto.AccountRegistrationMessage;
import pl.lodz.p.it.mtegi.messageservice.MessagingProperties;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Locale;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {


    private final MessagingProperties messagingProperties;
    private final JavaMailSender mailSender;

    private void sendMail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
        messageHelper.setTo(to);
        message.setSubject(subject);
        messageHelper.setText(htmlContent, true);
        mailSender.send(message);
    }

    @Override
    public void sendPasswordResetLink(String email, String token, String localeStr) throws MessagingException {

    }

    @Override
    public void sendActivationLink(AccountRegistrationMessage message) throws MessagingException {
        Locale locale = getLocale(message.getLocale());
        ResourceBundle bundle = ResourceBundle.getBundle("bundles.MessagesBundle", locale);

        sendMail(message.getEmail(), bundle.getString("VerifyEmailTitle"), StringUtils.join(
                "<div>",
                "<h2>", bundle.getString("VerifyEmailMessage"),"</h2>",
                "<a href=\"", messagingProperties.getSsl() ? "https" : "http", "://", messagingProperties.getHostname(), "/activate?username=", message.getUsername(), "&token=", message.getToken(), "\">", bundle.getString("ClickToActivate"), "</a>",
                "<p>", bundle.getString("IgnoreThisEmail"), "</p>",
                "<b>", bundle.getString("Team"),"</b>",
                "</div>"
        ));
    }

    @Override
    public void sendActivatedMessage(AccountConfirmationMessage message) throws MessagingException {
        Locale locale = getLocale(message.getLocale());
        ResourceBundle bundle = ResourceBundle.getBundle("bundles.MessagesBundle", locale);

        sendMail(message.getEmail(), bundle.getString("AccountConfirmedTitle"), StringUtils.join(
                "<div>",
                "<h2>", bundle.getString("AccountConfirmedMessage"),"</h2>",
                "<a href=\"", messagingProperties.getSsl() ? "https" : "http", "://", messagingProperties.getHostname(), "/login\">", bundle.getString("ClickToGoToPage"), "</a><br><br>",
                "<b>", bundle.getString("Team"),"</b>",
                "</div>"
        ));
    }

    private Locale getLocale(String localeStr) {
        if(localeStr.equals("default")) return new Locale("pl", "PL");
        String[] parts = localeStr.split("-");

        try {
            switch (parts.length) {
                case 1:
                    return new Locale(parts[0]);
                case 2:
                    return new Locale(parts[0], parts[1]);
                default:
                    return new Locale(parts[0], parts[1], parts[2]);
            }
        } catch (NullPointerException npe) {
            Logger.getGlobal().log(Level.SEVERE, npe.getMessage());
            return new Locale("pl", "PL");
        }
    }
}
