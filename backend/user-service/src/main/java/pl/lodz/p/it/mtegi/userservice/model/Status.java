package pl.lodz.p.it.mtegi.userservice.model;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Status {
    ACTIVE("A"),
    INACTIVE("I");

    private final String status;

    @JsonValue
    public String getStatus() {
        return status;
    }
}
