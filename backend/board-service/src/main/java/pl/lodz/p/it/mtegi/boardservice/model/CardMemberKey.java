package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class CardMemberKey implements Serializable {
    @Column
    private String cardId;

    @Column
    private Long memberId;

}
