package pl.lodz.p.it.mtegi.userservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import pl.lodz.p.it.mtegi.common.exception.ErrorWithMessageAndStatus;

@RequiredArgsConstructor
public enum UserError implements ErrorWithMessageAndStatus {
    NOT_FOUND("error:account.notfound", HttpStatus.NOT_FOUND),
    USERNAME_NOT_UNIQUE("error:form.username.taken", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_UNIQUE("error:form.email.taken", HttpStatus.BAD_REQUEST),
    BAD_TOKEN("error:account.badToken", HttpStatus.BAD_REQUEST),
    USER_ALREADY_CONFIRMED("error:account.confirmed", HttpStatus.CONFLICT);

    @Getter
    private final String message;

    @Getter
    private final HttpStatus status;
}
