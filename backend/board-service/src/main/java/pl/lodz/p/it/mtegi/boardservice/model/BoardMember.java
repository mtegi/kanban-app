package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "board_members")
@Data
@NoArgsConstructor
@SequenceGenerator(name="seq_board_member_id" ,initialValue=1, allocationSize=50)
public class BoardMember {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_board_member_id")
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne
    @JoinColumn(name="board_id", nullable = false, updatable = false)
    private Board board;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private LocalDateTime lastOpened;

    @Builder
    public BoardMember(String username, Board board) {
        this.username = username;
        this.board = board;
        this.lastOpened = LocalDateTime.now();
    }
}
