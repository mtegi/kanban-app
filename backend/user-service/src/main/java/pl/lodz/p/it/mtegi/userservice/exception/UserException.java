package pl.lodz.p.it.mtegi.userservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserException extends RuntimeException {

    @Getter
    private final UserError error;

    @Override
    public String getMessage() {
        return error.getMessage();
    }
}
