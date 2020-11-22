package pl.lodz.p.it.mtegi.boardservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.boardservice.dto.details.CardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.*;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.Card;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;
import pl.lodz.p.it.mtegi.boardservice.repository.BoardRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.CardRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.LaneRepository;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;
import pl.lodz.p.it.mtegi.common.exception.CommonError;

import java.util.ArrayList;
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
        Card card = findCardById(movedDto.getCardId());
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
        Card card = findCardById(deletedDto.getCardId());
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

    @Override
    public LaneAddedDto onLaneAdded(LaneAddedDto dto) {
        Board board = boardRepository.findById(dto.getBoardId()).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
        Lane lane = Lane.builder().board(board).cards(new ArrayList<>()).index(board.getLanes().size()).build();
        dto.putProperties(lane);
        board.getLanes().add(lane);
        boardRepository.save(board);
        dto.setLanes(board.getLanes().stream().map(l -> {
            LaneDetailsDto newDto = new LaneDetailsDto();
            newDto.fillProperties(l);
            return newDto;
        }).collect(Collectors.toList()));
        dto.getLanes().sort(Comparator.comparing(LaneDetailsDto::getIndex));
        dto.getLanes().forEach(l -> l.getCards().sort(Comparator.comparing(CardDetailsDto::getIndex)));
        return dto;
    }

    public Lane findById(Long id) {
        return laneRepository.findById(id).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
    }

    public Card findCardById(String id) {
        return cardRepository.findById(id).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
    }
}
