package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "cards")
@Data
@SequenceGenerator(name="seq_card_id", initialValue=1, allocationSize=50)
public class Card {

    @Id
    private String id;

    @Version
    @Setter(AccessLevel.NONE)
    private Long version;

    @Column
    private String title;

    @Column
    private Integer index;

    @Column
    private String description;

}
