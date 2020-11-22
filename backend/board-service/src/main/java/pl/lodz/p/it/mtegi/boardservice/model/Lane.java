package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "lanes")
@Data
@AllArgsConstructor
@Builder
@SequenceGenerator(name="seq_lane_id", initialValue=1, allocationSize=50)
public class Lane {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_lane_id")
    @Setter(AccessLevel.NONE)
    private Long id;

    @Version
    @Setter(AccessLevel.NONE)
    private Long version;

    @Column
    private String title;

    @Column(nullable = false)
    private Integer index;

    @Column
    private Integer taskLimit;

    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false, updatable = false)
    private Board board;

    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="card_id", nullable = false)
    private List<Card> cards;

    public Lane() {
    }
}
