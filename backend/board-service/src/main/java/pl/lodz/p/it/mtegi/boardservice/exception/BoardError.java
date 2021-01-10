package pl.lodz.p.it.mtegi.boardservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import pl.lodz.p.it.mtegi.common.exception.ErrorWithMessageAndStatus;

@RequiredArgsConstructor
public enum BoardError implements ErrorWithMessageAndStatus {
    NOT_FOUND("error:account.notfound", HttpStatus.BAD_REQUEST),
    CARD_NOT_FOUND("error:card.notfound", HttpStatus.BAD_REQUEST),
    MEMBER_NOT_FOUND("error:member.notfound", HttpStatus.BAD_REQUEST),
    INVALID_INVITE_TOKEN("error:inviteToken.invalid", HttpStatus.BAD_REQUEST),
    USER_ALREADY_INVITED("error:inviteToken.invited", HttpStatus.BAD_REQUEST),
    TASK_LIMIT_REACHED("error:lane.taskLimit", HttpStatus.BAD_REQUEST),
    TIME_ENTRY_DATE_ERROR("error:time.dateError", HttpStatus.BAD_REQUEST);

    @Getter
    private final String message;

    @Getter
    private final HttpStatus status;
}
