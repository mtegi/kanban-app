package pl.lodz.p.it.mtegi.messageservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Controller;
import pl.lodz.p.it.mtegi.common.messaging.AMQP;
import pl.lodz.p.it.mtegi.common.messaging.dto.AccountConfirmationMessage;
import pl.lodz.p.it.mtegi.common.messaging.dto.AccountRegistrationMessage;
import pl.lodz.p.it.mtegi.messageservice.service.MailService;

import javax.mail.MessagingException;

@Controller
@RequiredArgsConstructor
public class AsyncMailController {
    private final MailService mailService;

    @RabbitListener(queues = {AMQP.QUEUES.REGISTER})
    public void listenForUserRegistration(AccountRegistrationMessage message) throws MessagingException {
        mailService.sendActivationLink(message);
    }

    @RabbitListener(queues = {AMQP.QUEUES.ACCOUNT_CONFIRM})
    public void listenForUserConfirmation(AccountConfirmationMessage message) throws MessagingException {
        mailService.sendActivatedMessage(message);
    }
}
