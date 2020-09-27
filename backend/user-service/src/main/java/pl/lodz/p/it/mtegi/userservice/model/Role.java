package pl.lodz.p.it.mtegi.userservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
@Data
@SequenceGenerator(name="seq_role_id", initialValue=1, allocationSize=50)
public class Role {

    public interface Name {
        String OWNER = "ROLE_OWNER";
        String DEVELOPER = "ROLE_DEVELOPER";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_role_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "project_id")
    private Long projectId;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<Permission> permissions;

}
