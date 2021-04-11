package pl.lodz.p.it.mtegi.boardservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.boardservice.dto.details.CardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneEditDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.*;
import pl.lodz.p.it.mtegi.boardservice.exception.BoardError;
import pl.lodz.p.it.mtegi.boardservice.model.*;
import pl.lodz.p.it.mtegi.boardservice.repository.*;
import pl.lodz.p.it.mtegi.boardservice.utils.LaneUtils;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;
import pl.lodz.p.it.mtegi.common.exception.CommonError;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class LaneServiceImpl implements LaneService {

    private final LaneRepository laneRepository;
    private final CardRepository cardRepository;
    private final BoardRepository boardRepository;
    private final AssignedCardRepository assignedCardRepository;
    private final BoardMemberRepository memberRepository;

    @Override
    public CardAddedDto addCardToLane(CardAddedDto dto) {
        Lane lane = findById(dto.getLaneId());
        if(lane.getTaskLimit() != null && lane.getCards().size() + 1 > lane.getTaskLimit()) {
            throw new ApplicationException(BoardError.TASK_LIMIT_REACHED);
        }
        Card card = new Card();
        dto.getCard().putProperties(card);
        card.setIndex(lane.getCards().size());
        card.setLane(lane);
        card.setCreatedAt(LocalDateTime.now());
        cardRepository.save(card);
        if(!dto.getCard().getMembers().isEmpty()){
            setMembers(card.getId(), dto.getCard().getMembers());
        }
        dto.getCard().fillProperties(card);
        return dto;
    }

    @Override
    public CardMovedDto moveCardAcrossLanes(CardMovedDto movedDto) {
        Card card = findCardById(movedDto.getCardId());
        Lane toLane = findById(movedDto.getToLaneId());
        List<Card> toCards = toLane.getCards();
        if(toLane.getTaskLimit() != null && toCards.size() + 1 > toLane.getTaskLimit()) {
            throw new ApplicationException(BoardError.TASK_LIMIT_REACHED);
        }
        List<Card> fromCards = findById(movedDto.getFromLaneId()).getCards();
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
        card.setLane(toLane);
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
        updateDto.setLanes(LaneUtils.mapToDto(lane.getBoard().getLanes()));
        LaneUtils.sort(updateDto.getLanes());
        return updateDto;
    }

    @Override
    public LaneAddedDto onLaneAdded(LaneAddedDto dto) {
        Board board = boardRepository.findById(dto.getBoardId()).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
        Lane lane = Lane.builder().board(board).cards(new ArrayList<>()).index(board.getLanes().size()).build();
        dto.putProperties(lane);
        board.getLanes().add(lane);
        boardRepository.save(board);
        dto.setLanes(LaneUtils.mapToDto(board.getLanes()));
        LaneUtils.sort(dto.getLanes());
        return dto;
    }

    @Override
    public LaneDeletedDto onLaneDeleted(LaneDeletedDto dto) {
        Lane lane = findById(dto.getLaneId());
        Board board = boardRepository.findById(dto.getBoardId()).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
        List<Lane> lanes = board.getLanes();
        lanes.remove(lane);
        lanes.stream().filter(l -> l.getIndex() > lane.getIndex()).forEach(l -> l.setIndex(l.getIndex() - 1));
        laneRepository.delete(lane);
        dto.setLanes(LaneUtils.mapToDto(board.getLanes()));
        LaneUtils.sort(dto.getLanes());
        return dto;
    }

    @Override
    public LaneMovedDto onLaneMoved(LaneMovedDto movedDto) {
        Board board = boardRepository.findById(movedDto.getBoardId()).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
        Lane lane = findById(movedDto.getLaneId());
        if(movedDto.getToIndex() < movedDto.getFromIndex()) {
            board.getLanes().stream().filter(l -> l.getIndex() >= movedDto.getToIndex() && l.getIndex() <= movedDto.getFromIndex()).forEach(l -> l.setIndex(l.getIndex() + 1));
        } else if(movedDto.getToIndex() > movedDto.getFromIndex()) {
            board.getLanes().stream().filter(l -> l.getIndex() <= movedDto.getToIndex() && l.getIndex() >= movedDto.getFromIndex()).forEach(l -> l.setIndex(l.getIndex() - 1));
        }
        lane.setIndex(movedDto.getToIndex());
        laneRepository.saveAll(board.getLanes());
        movedDto.setLanes(LaneUtils.mapToDto(board.getLanes()));
        LaneUtils.sort(movedDto.getLanes());
        return movedDto;
    }

    @Override
    public CardDetailsDto getCardDetails(String id) {
        CardDetailsDto dto = new CardDetailsDto();
        dto.fillProperties(findCardById(id));
        dto.setMembers(assignedCardRepository.findByIdCardId(id).stream().map(card -> card.getMember().getUsername()).collect(Collectors.toList()));
        return dto;
    }

    @Override
    public CardUpdatedDto onCardUpdated(CardUpdatedDto dto) {
        Card card = findCardById(dto.getCard().getId());
        dto.getCard().setIndex(card.getIndex());
        dto.getCard().putProperties(card);
        dto.setLaneId(card.getLane().getId());
        setMembers(card.getId(), dto.getCard().getMembers());
        cardRepository.save(card);
        dto.getCard().fillProperties(card);
        return dto;
    }

    @Override
    public LaneEditDetailsDto getLaneEditDetails(Long id) {
        LaneEditDetailsDto dto = new LaneEditDetailsDto();
        dto.fillProperties(findById(id));
        return dto;
    }

    @Override
    public LaneUpdateDto updateLaneDetails(LaneEditDetailsDto dto) {
        Lane lane = findById(dto.getId());
        dto.putProperties(lane);
        laneRepository.save(lane);
        LaneUpdateDto updateDto = new LaneUpdateDto();
        updateDto.setLanes(LaneUtils.mapToDto(lane.getBoard().getLanes()));
        LaneUtils.sort(updateDto.getLanes());
        return updateDto;
    }

    public Lane findById(Long id) {
        return laneRepository.findById(id).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
    }

    public Card findCardById(String id) {
        return cardRepository.findById(id).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
    }

    private void setMembers(String cardId, List<String> usernames) {
        List<AssignedCard> assignedCards = assignedCardRepository.findByIdCardId(cardId);
        assignedCardRepository.deleteAll(assignedCards.stream().filter(assignedCard -> !usernames.contains(assignedCard.getMember().getUsername())).collect(Collectors.toList()));
        usernames.forEach(username -> {
            Optional<AssignedCard> assignedCardOptional = assignedCards.stream().filter(assignedCard -> username.equals(assignedCard.getMember().getUsername())).findAny();
            if(assignedCardOptional.isEmpty()){
                Card card = cardRepository.getOne(cardId);
                BoardMember member = memberRepository.findFirstByUsernameAndBoard_Id(username, card.getLane().getBoard().getId()).orElseThrow(() -> new ApplicationException(BoardError.NOT_FOUND));
                assignedCardRepository.save(new AssignedCard(card, member));
            }
        });
    }
}
