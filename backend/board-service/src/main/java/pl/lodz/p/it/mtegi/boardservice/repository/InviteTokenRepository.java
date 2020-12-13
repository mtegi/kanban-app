package pl.lodz.p.it.mtegi.boardservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.mtegi.boardservice.model.InviteToken;

import java.util.Optional;

public interface InviteTokenRepository extends JpaRepository<InviteToken, Long> {
    Optional<InviteToken> findByValue(String value);
}
