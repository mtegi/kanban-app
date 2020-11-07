package pl.lodz.p.it.mtegi.boardservice.service;

import pl.lodz.p.it.mtegi.boardservice.dto.events.CardAddedDto;

public interface LaneService {
    CardAddedDto addCardToLane(CardAddedDto card);
}
