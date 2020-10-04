package pl.lodz.p.it.mtegi.common.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class ApplicationExceptionHandler {
    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ErrorInfo> handleException(ApplicationException e) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if(e.getStatus() != null) {
            status = e.getStatus();
        }
        return ResponseEntity.status(status).body(new ErrorInfo(e.getMessage()));
    }
}
