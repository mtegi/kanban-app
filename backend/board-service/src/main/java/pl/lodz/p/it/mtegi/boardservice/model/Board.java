package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boards")
@Data
@SequenceGenerator(name="seq_board_id" ,initialValue=1, allocationSize=50)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_board_id")
    @Setter(AccessLevel.NONE)
    private Long id;

    @Version
    @Setter(AccessLevel.NONE)
    private Long version;
    
    @Column(nullable = false)
    @NotBlank(message = "board.name.blank")
    private String name;

    @Column(nullable = false)
    private String color;

    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "board")
    private List<Lane> lanes;

    @ToString.Exclude
    @OneToMany(mappedBy = "board" ,cascade = CascadeType.ALL)
    private List<BoardMember> members = new ArrayList<>();
}
