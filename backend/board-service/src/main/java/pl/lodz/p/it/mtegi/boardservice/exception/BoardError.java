package pl.lodz.p.it.mtegi.boardservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import pl.lodz.p.it.mtegi.common.exception.ErrorWithMessageAndStatus;

@RequiredArgsConstructor
public enum BoardError implements ErrorWithMessageAndStatus {
    NOT_FOUND("error:account.notfound", HttpStatus.NOT_FOUND),
    INVALID_INVITE_TOKEN("error:inviteToken.invalid", HttpStatus.BAD_REQUEST),
    USER_ALREADY_INVITED("error:inviteToken.invited", HttpStatus.BAD_REQUEST);

    @Getter
    private final String message;

    @Getter
    private final HttpStatus status;
}
