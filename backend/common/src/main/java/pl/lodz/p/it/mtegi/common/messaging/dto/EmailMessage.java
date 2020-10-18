package pl.lodz.p.it.mtegi.common.messaging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public abstract class EmailMessage {
    private String email;

    public EmailMessage(String email) {
        this.email = email;
    }
}
