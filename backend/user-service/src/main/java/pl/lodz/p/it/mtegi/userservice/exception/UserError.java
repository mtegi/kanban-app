package pl.lodz.p.it.mtegi.userservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum UserError {
    NOT_FOUND("user.notfound"),
    USERNAME_NOT_UNIQUE("user.username.unique"),
    EMAIL_NOT_UNIQUE("user.email.unique");

    @Getter
    private final String message;
}
