package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class AssignedCard {
    @EmbeddedId
    private CardMemberKey id;

    @ManyToOne
    @MapsId("cardId")
    @JoinColumn(name = "card_id")
    private Card card;

    @ManyToOne
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    private BoardMember member;
}
