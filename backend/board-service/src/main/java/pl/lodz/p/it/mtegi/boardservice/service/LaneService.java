package pl.lodz.p.it.mtegi.boardservice.service;

import pl.lodz.p.it.mtegi.boardservice.dto.events.CardAddedDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardDeletedDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardMovedDto;

public interface LaneService {
    CardAddedDto addCardToLane(CardAddedDto card);
    CardMovedDto moveCardAcrossLanes(CardMovedDto movedDto);
    CardDeletedDto deleteCard(CardDeletedDto deletedDto);
}
