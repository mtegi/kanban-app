package pl.lodz.p.it.mtegi.userservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

import static pl.lodz.p.it.mtegi.userservice.model.Status.ACTIVE;

@Entity
@Table(name = "users")
@Data
@SequenceGenerator(name="seq_user_id", initialValue=1, allocationSize=50)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_user_id")
    private Long id;

    @Version
    @Setter(AccessLevel.NONE)
    private Long version;

    @Column(nullable = false, unique = true, updatable = false)
    private String username;

    private String firstName;

    private String lastName;

    @Column(length = 60)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private Status status;

    private boolean confirmed;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Role> roles;

    @JsonIgnore
    public boolean isActive() {
        return ACTIVE.equals(getStatus());
    }
}
