package pl.lodz.p.it.mtegi.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pl.lodz.p.it.mtegi.common.validation.ValidationMessage;

public class CommonValidationExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleException(MethodArgumentNotValidException e) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = ValidationMessage.CONSTRAINT;
        if(e.getBindingResult().getFieldError() != null){
            message = e.getBindingResult().getFieldError().getDefaultMessage();
        }
        return ResponseEntity.status(status).body(new ErrorInfo(message));
    }
}
