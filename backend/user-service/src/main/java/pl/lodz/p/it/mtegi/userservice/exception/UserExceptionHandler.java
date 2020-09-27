package pl.lodz.p.it.mtegi.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorInfo> handleException(UserException e) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        switch (e.getError()) {
            case NOT_FOUND:
                status = HttpStatus.NOT_FOUND;
                break;
            case USERNAME_NOT_UNIQUE:
            case EMAIL_NOT_UNIQUE:
                status = HttpStatus.BAD_REQUEST;
                break;
        }
        return ResponseEntity.status(status).body(new ErrorInfo(e.getMessage()));
    }

}
