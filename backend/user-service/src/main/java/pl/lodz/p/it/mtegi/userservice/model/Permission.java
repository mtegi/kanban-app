package pl.lodz.p.it.mtegi.userservice.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "permissions")
@Data
@SequenceGenerator(name="seq_permission_id", initialValue=1, allocationSize=50)
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_permission_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "code_id")
    private PermissionCode code;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;


}
