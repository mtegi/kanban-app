package pl.lodz.p.it.mtegi.boardservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.boardservice.dto.details.CardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardAddedDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardDeletedDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardMovedDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.LaneUpdateDto;
import pl.lodz.p.it.mtegi.boardservice.model.Card;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;
import pl.lodz.p.it.mtegi.boardservice.repository.BoardRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.CardRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.LaneRepository;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;
import pl.lodz.p.it.mtegi.common.exception.CommonError;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class LaneServiceImpl implements LaneService {

    private final LaneRepository laneRepository;
    private final CardRepository cardRepository;
    private final BoardRepository boardRepository;

    @Override
    public CardAddedDto addCardToLane(CardAddedDto dto) {
        Card card = new Card();
        dto.getCard().putProperties(card);
        List<Card> cards = findById(dto.getLaneId()).getCards();
        card.setIndex(cards.size());
        cards.add(card);
        cardRepository.save(card);
        dto.getCard().fillProperties(card);
        return dto;
    }

    @Override
    public CardMovedDto moveCardAcrossLanes(CardMovedDto movedDto) {
        Card card = findById(movedDto.getCardId());
        List<Card> fromCards = findById(movedDto.getFromLaneId()).getCards();
        List<Card> toCards = findById(movedDto.getToLaneId()).getCards();
        fromCards.remove(card);
        toCards.add(card);
        fromCards.forEach(c -> {
            if (c.getIndex() >= card.getIndex() && !card.getId().equals(c.getId())) {
                c.setIndex(c.getIndex() - 1);
                cardRepository.save(c);
            }
        });
        toCards.forEach(c -> {
            if (c.getIndex() >= movedDto.getIndex() && !card.getId().equals(c.getId())) {
                c.setIndex(c.getIndex() + 1);
                cardRepository.save(c);
            }
        });
        card.setIndex(movedDto.getIndex());
        cardRepository.save(card);
        return movedDto;
    }

    @Override
    public CardDeletedDto deleteCard(CardDeletedDto deletedDto) {
        Card card = findById(deletedDto.getCardId());
        List<Card> cards = findById(deletedDto.getLaneId()).getCards();
        cards.remove(card);
        cards.stream().filter(c -> c.getIndex() > card.getIndex()).forEach(c -> c.setIndex(c.getIndex() - 1));
        cardRepository.delete(card);
        return deletedDto;
    }

    @Override
    public LaneUpdateDto updateLane(LaneUpdateDto updateDto) {
        Lane lane = findById(updateDto.getLaneId());
        updateDto.getData().putProperties(lane);
        laneRepository.save(lane);
        updateDto.setLanes(lane.getBoard().getLanes().stream().map(l -> {
            LaneDetailsDto dto = new LaneDetailsDto();
            dto.fillProperties(l);
            return dto;
        }).collect(Collectors.toList()));
        updateDto.getLanes().sort(Comparator.comparing(LaneDetailsDto::getIndex));
        updateDto.getLanes().forEach(l -> l.getCards().sort(Comparator.comparing(CardDetailsDto::getIndex)));
        return updateDto;
    }

    public Lane findById(Long id) {
        return laneRepository.findById(id).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
    }

    public Card findById(String id) {
        return cardRepository.findById(id).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
    }
}
