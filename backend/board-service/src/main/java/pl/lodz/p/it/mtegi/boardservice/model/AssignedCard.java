package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
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

    public AssignedCard(Card card, BoardMember member){
        setId(new CardMemberKey(card.getId(), member.getId()));
        setCard(card);
        setMember(member);
    }
}
