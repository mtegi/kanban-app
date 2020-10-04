package pl.lodz.p.it.mtegi.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
public class ErrorInfo {

    private final String message;

}
