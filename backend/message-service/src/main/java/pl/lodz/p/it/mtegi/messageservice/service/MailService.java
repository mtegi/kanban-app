package pl.lodz.p.it.mtegi.messageservice.service;

import pl.lodz.p.it.mtegi.common.messaging.dto.AccountConfirmationMessage;
import pl.lodz.p.it.mtegi.common.messaging.dto.AccountRegistrationMessage;

import javax.mail.MessagingException;

public interface MailService {
    void sendPasswordResetLink(String email, String token, String localeStr) throws MessagingException;
    void sendActivationLink(AccountRegistrationMessage message) throws MessagingException;
    void sendActivatedMessage(AccountConfirmationMessage message) throws MessagingException;
}
