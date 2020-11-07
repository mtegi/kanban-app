package pl.lodz.p.it.mtegi.boardservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import pl.lodz.p.it.mtegi.common.exception.ErrorWithMessageAndStatus;

@RequiredArgsConstructor
public enum BoardError implements ErrorWithMessageAndStatus {
    NOT_FOUND("error:account.notfound", HttpStatus.NOT_FOUND);

    @Getter
    private final String message;

    @Getter
    private final HttpStatus status;
}
