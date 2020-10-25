package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;
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
    private String name;

    @Column
    @Min(0)
    private Integer sequence;

    private Integer taskLimit;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="lane_id", nullable = false)
    private List<Task> tasks;

    public Lane() {
    }
}
