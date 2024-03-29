package pl.lodz.p.it.mtegi.boardservice.service;

import pl.lodz.p.it.mtegi.boardservice.dto.details.CardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneEditDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.*;

public interface LaneService {
    CardAddedDto addCardToLane(CardAddedDto card);
    CardMovedDto moveCardAcrossLanes(CardMovedDto movedDto);
    CardDeletedDto deleteCard(CardDeletedDto deletedDto);
    LaneUpdateDto updateLane(LaneUpdateDto updateDto);
    LaneAddedDto onLaneAdded(LaneAddedDto dto);
    LaneDeletedDto onLaneDeleted(LaneDeletedDto dto);
    LaneMovedDto onLaneMoved(LaneMovedDto movedDto);
    CardDetailsDto getCardDetails(String id);
    CardUpdatedDto onCardUpdated(CardUpdatedDto dto);
    LaneEditDetailsDto getLaneEditDetails(Long id);
    LaneUpdateDto updateLaneDetails(LaneEditDetailsDto dto);
}
