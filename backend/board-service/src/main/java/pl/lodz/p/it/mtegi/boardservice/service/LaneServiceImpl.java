package pl.lodz.p.it.mtegi.boardservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardAddedDto;
import pl.lodz.p.it.mtegi.boardservice.model.Card;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;
import pl.lodz.p.it.mtegi.boardservice.repository.LaneRepository;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;
import pl.lodz.p.it.mtegi.common.exception.CommonError;

@Service
@Transactional
@RequiredArgsConstructor
public class LaneServiceImpl implements LaneService {

    private final LaneRepository laneRepository;

    @Override
    public CardAddedDto addCardToLane(CardAddedDto dto) {
        Card card = new Card();
        dto.getCard().putProperties(card);
        findById(dto.getLaneId()).getCards().add(card);
        dto.getCard().fillProperties(card);
        return dto;
    }

    public Lane findById(Long id) {
        return laneRepository.findById(id).orElseThrow(() -> new ApplicationException(CommonError.NOT_FOUND));
    }
}
