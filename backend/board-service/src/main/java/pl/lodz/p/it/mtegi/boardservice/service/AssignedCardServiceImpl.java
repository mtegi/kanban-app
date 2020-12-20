package pl.lodz.p.it.mtegi.boardservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.boardservice.exception.BoardError;
import pl.lodz.p.it.mtegi.boardservice.model.AssignedCard;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;
import pl.lodz.p.it.mtegi.boardservice.model.Card;
import pl.lodz.p.it.mtegi.boardservice.repository.AssignedCardRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.BoardMemberRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.CardRepository;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AssignedCardServiceImpl implements AssignedCardService {

    private final AssignedCardRepository assignedCardRepository;
    private final CardRepository cardRepository;
    private final BoardMemberRepository memberRepository;


    @Override
    public void setMembers(String cardId, List<String> usernames) {
        List<AssignedCard> assignedCards = assignedCardRepository.findByIdCardId(cardId);
        assignedCardRepository.deleteAll(assignedCards.stream().filter(assignedCard -> !usernames.contains(assignedCard.getMember().getUsername())).collect(Collectors.toList()));
        usernames.forEach(username -> {
            Optional<AssignedCard> assignedCardOptional = assignedCards.stream().filter(assignedCard -> username.equals(assignedCard.getMember().getUsername())).findAny();
            if(assignedCardOptional.isEmpty()){
                AssignedCard assignedCard = new AssignedCard();
                Card card = cardRepository.getOne(cardId);
                BoardMember member = memberRepository.findFirstByUsernameAndBoard_Id(username, card.getLane().getBoard().getId()).orElseThrow(() -> new ApplicationException(BoardError.NOT_FOUND));
                assignedCard.setMember(member);
                assignedCard.setCard(card);
                assignedCardRepository.save(assignedCard);
            }
        });

    }
}
