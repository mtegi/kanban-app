package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

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

    @Column(nullable = false)
    private Integer index;

    @Column
    private String description;

    @Column
    private LocalDateTime deadline;

    @Column
    private String color;

    @ManyToOne
    @JoinColumn(name="lane_id", nullable = false)
    private Lane lane;

    @ToString.Exclude
    @OneToMany(mappedBy = "card")
    private Set<AssignedCard> members;

}
