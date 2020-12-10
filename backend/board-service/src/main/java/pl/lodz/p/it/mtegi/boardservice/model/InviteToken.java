package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "invite_tokens")
@Data
@SequenceGenerator(name="seq_inv_token_id", initialValue=1, allocationSize=50)
public class InviteToken {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_inv_token_id")
    @Setter(AccessLevel.NONE)
    private Long id;

    @Version
    @Setter(AccessLevel.NONE)
    private Long version;

    @OneToOne
    @JoinColumn(name="board_id", nullable = false)
    private Board board;

    @Column(nullable = false)
    private String value;
}
