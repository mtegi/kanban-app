package pl.lodz.p.it.mtegi.common.messaging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccountRegistrationMessage extends EmailMessage {
    private String username;
    private String token;
    private String locale;

    public AccountRegistrationMessage(String username, String email, String token, String locale) {
        super(email);
        this.username = username;
        this.token = token;
        this.locale = locale;
    }
}
