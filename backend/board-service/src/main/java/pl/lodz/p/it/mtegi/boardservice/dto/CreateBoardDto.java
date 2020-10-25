package pl.lodz.p.it.mtegi.boardservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lodz.p.it.mtegi.boardservice.model.Board;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class CreateBoardDto {
    @NotBlank
    private String name;

    public void putProperties(Board entity) {
        entity.setName(getName());
    }
}
