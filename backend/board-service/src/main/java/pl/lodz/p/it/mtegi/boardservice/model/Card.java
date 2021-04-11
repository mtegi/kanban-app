package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.*;

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

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column
    private String color;

    @ManyToOne
    @JoinColumn(name="lane_id", nullable = false)
    private Lane lane;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "card")
    private Set<AssignedCard> members;

}
