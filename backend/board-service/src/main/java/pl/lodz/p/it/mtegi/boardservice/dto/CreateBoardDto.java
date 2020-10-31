package pl.lodz.p.it.mtegi.boardservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.common.validation.Regex;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
public class CreateBoardDto {
    @NotBlank
    private String name;
    @Pattern( regexp = Regex.HEX_COLOR, message = "errors.form.color")
    private String color;

    public void putProperties(Board entity) {
        entity.setName(getName());
        entity.setColor(color);
    }
}
