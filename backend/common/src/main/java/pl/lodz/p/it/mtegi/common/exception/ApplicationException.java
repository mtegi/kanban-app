package pl.lodz.p.it.mtegi.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public class ApplicationException extends RuntimeException {

    @Getter
    private final ErrorWithMessageAndStatus error;

    @Override
    public String getMessage() {
        return error.getMessage();
    }

    public HttpStatus getStatus() {
        return error.getStatus();
    }
}
