package pl.lodz.p.it.mtegi.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum CommonError implements ErrorWithMessageAndStatus {
    NOT_FOUND("error:notfound", HttpStatus.NOT_FOUND);

    @Getter
    private final String message;

    @Getter
    private final HttpStatus status;
}
