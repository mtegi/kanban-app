package pl.lodz.p.it.mtegi.common.messaging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccountConfirmationMessage extends EmailMessage {
    private String username;
    private String locale;

    public AccountConfirmationMessage(String username, String email, String locale) {
        super(email);
        this.username = username;
        this.locale = locale;
    }
}
