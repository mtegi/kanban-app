package pl.lodz.p.it.mtegi.projectservice.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "tasks")
@Data
@SequenceGenerator(name="seq_task_id", initialValue=1, allocationSize=50)
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_task_id")
    private Long id;

    @Version
    @Setter(AccessLevel.NONE)
    private Long version;

    @Column
    @Size
    private Integer priority;

    @Column
    private String name;

    @Column
    private String comment;

}
