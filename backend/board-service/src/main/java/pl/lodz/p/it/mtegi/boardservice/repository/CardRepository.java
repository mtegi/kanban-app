package pl.lodz.p.it.mtegi.boardservice.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.mtegi.boardservice.model.Card;

public interface CardRepository extends JpaRepository<Card, String> {

    @Query(value = "SELECT lane_id FROM cards c WHERE c.id = ?1")
    Long findLaneIdById(String id);
}
