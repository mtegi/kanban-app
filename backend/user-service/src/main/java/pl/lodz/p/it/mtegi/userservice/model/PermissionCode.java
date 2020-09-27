package pl.lodz.p.it.mtegi.userservice.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "permission_codes")
@Data
@SequenceGenerator(name="seq_permission_code_id", initialValue=1, allocationSize=50)
public class PermissionCode {

    public interface Values {
        String PROJECT_READ = "PROJECT_READ";
        String PROJECT_WRITE = "PROJECT_WRITE";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_permission_code_id")
    private Long id;

    @Column(unique = true, nullable = false)
    private String value;

}
