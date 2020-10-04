package pl.lodz.p.it.mtegi.userservice.exception;

import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.lodz.p.it.mtegi.common.exception.CommonValidationExceptionHandler;

@RestControllerAdvice
public class ValidationExceptionHandler extends CommonValidationExceptionHandler {}
