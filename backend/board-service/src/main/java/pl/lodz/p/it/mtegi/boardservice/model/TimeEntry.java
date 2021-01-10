package pl.lodz.p.it.mtegi.boardservice.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "time_entries")
@Data
@NoArgsConstructor
@SequenceGenerator(name="seq_time_entry_id" ,initialValue=1, allocationSize=50)
public class TimeEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_time_entry_id")
    @Setter(AccessLevel.NONE)
    private Long id;

    @Version
    @Setter(AccessLevel.NONE)
    private Long version;

    @ManyToOne
    @JoinColumn(name="card_id", nullable = false)
    private Card card;

    @ManyToOne
    @JoinColumn(name="member_id", nullable = false)
    private BoardMember member;

    @Column(nullable = false)
    private LocalDateTime fromDate;

    @Column(nullable = false)
    private LocalDateTime toDate;

    public TimeEntry(Card card, BoardMember member, LocalDateTime fromDate, LocalDateTime toDate){
        setCard(card);
        setMember(member);
        setFromDate(fromDate);
        setToDate(toDate);
    }
}
