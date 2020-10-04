package pl.lodz.p.it.mtegi.common.exception;

import org.springframework.http.HttpStatus;

public interface ErrorWithMessageAndStatus {
    String getMessage();

    HttpStatus getStatus();
}
