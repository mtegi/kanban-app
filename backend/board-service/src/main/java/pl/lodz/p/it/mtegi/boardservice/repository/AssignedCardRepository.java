package pl.lodz.p.it.mtegi.boardservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.mtegi.boardservice.model.AssignedCard;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;
import pl.lodz.p.it.mtegi.boardservice.model.CardMemberKey;

import java.util.List;
import java.util.Optional;

public interface AssignedCardRepository extends JpaRepository<AssignedCard, CardMemberKey> {
    List<AssignedCard> findByIdCardId(String id);
    List<AssignedCard> findByIdMemberId(Long id);
    Optional<AssignedCard> findFirstByMemberUsernameAndCard_Id(String username, String cardId);
}
