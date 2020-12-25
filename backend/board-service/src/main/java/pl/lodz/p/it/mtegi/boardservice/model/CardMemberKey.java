package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardMemberKey implements Serializable {
    @Column
    private String cardId;

    @Column
    private Long memberId;
}
