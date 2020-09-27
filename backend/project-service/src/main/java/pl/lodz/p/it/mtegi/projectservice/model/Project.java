package pl.lodz.p.it.mtegi.projectservice.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "projects")
@Data
@SequenceGenerator(name="seq_project_id" ,initialValue=1, allocationSize=50)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_project_id")
    private Long id;

    @Version
    @Setter(AccessLevel.NONE)
    private Long version;
    
    @Column(nullable = false)
    @NotBlank(message = "project.name.blank")
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="project_id", nullable = false, updatable = false)
    private List<Lane> lanes;


}
