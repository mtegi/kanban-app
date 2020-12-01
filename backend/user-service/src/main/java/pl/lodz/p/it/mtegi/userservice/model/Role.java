package pl.lodz.p.it.mtegi.userservice.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Data
@SequenceGenerator(name="seq_role_id", initialValue=1, allocationSize=50)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_role_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "board_id")
    private Long boardId;

    @Enumerated(EnumType.STRING)
    private pl.lodz.p.it.mtegi.common.security.model.Role role;

    public Role() {}
    @Builder
    public Role(Long boardId, User user, pl.lodz.p.it.mtegi.common.security.model.Role role){
        setBoardId(boardId);
        setUser(user);
        setRole(role);
    }

}
