package pl.lodz.p.it.mtegi.userservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class ActivateDto {
    @NotBlank
    private String username;
    @NotBlank
    private String token;
    private String locale;
}
