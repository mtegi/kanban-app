package pl.lodz.p.it.mtegi.projectservice.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "lanes")
@Data
@SequenceGenerator(name="seq_lane_id", initialValue=1, allocationSize=50)
public class Lane {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_lane_id")
    private Long id;

    @Version
    @Setter(AccessLevel.NONE)
    private Long version;

    @Column
    private String name;

    @Column
    @Size
    private Integer priority;

    private Integer taskLimit;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="lane_id", nullable = false)
    private List<Task> tasks;
}
