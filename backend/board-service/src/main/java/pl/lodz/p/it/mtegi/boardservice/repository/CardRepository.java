package pl.lodz.p.it.mtegi.boardservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.mtegi.boardservice.model.Card;

public interface CardRepository extends JpaRepository<Card, String> {
}
