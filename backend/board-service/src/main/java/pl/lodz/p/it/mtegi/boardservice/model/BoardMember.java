package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

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

    @Column(nullable = false)
    private boolean favourite;

    @ToString.Exclude
    @OneToMany(mappedBy = "member")
    private Set<AssignedCard> assignedCards;

    @Builder
    public BoardMember(String username, Board board) {
        setUsername(username);
        setBoard(board);
        setLastOpened(LocalDateTime.now());
        setFavourite(false);
    }
}
