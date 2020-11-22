package pl.lodz.p.it.mtegi.boardservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import pl.lodz.p.it.mtegi.boardservice.dto.events.*;
import pl.lodz.p.it.mtegi.boardservice.service.BoardService;
import pl.lodz.p.it.mtegi.boardservice.service.LaneService;

@Controller
@RequiredArgsConstructor
public class BoardWsController {

    private final LaneService laneService;
    private final BoardService boardService;
    private final SimpMessageSendingOperations messageTemplate;

    @MessageMapping("/{boardId}/card/add")
    public void onCardAdded(@DestinationVariable Long boardId, @Payload CardAddedDto dto, Authentication authentication) {
        dto.setUsername(authentication.getName());
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.addCardToLane(dto));
    }

    @MessageMapping("/{boardId}/card/move")
    public void onCardMoved(@DestinationVariable Long boardId, @Payload CardMovedDto dto, Authentication authentication) {
        dto.setUsername(authentication.getName());
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.moveCardAcrossLanes(dto));
    }

    @MessageMapping("/{boardId}/card/delete")
    public void onCardDeleted(@DestinationVariable Long boardId, @Payload CardDeletedDto dto, Authentication authentication) {
        dto.setUsername(authentication.getName());
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.deleteCard(dto));
    }

    @MessageMapping("/{boardId}/lane/update")
    public void onLaneUpdated(@DestinationVariable Long boardId, @Payload LaneUpdateDto dto, Authentication authentication) {
        dto.setUsername(authentication.getName());
        dto.setBoardId(boardId);
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.updateLane(dto));
    }

    @MessageMapping("/{boardId}/board/open")
    public void onBoardOpened(@DestinationVariable Long boardId, Authentication authentication) {
        BoardOpenedDto dto = new BoardOpenedDto();
        dto.setUsername(authentication.getName());
        dto.setBoardId(boardId);
        boardService.onBoardOpened(dto);
    }

    @MessageMapping("/{boardId}/board/favourite")
    public void onBoardFavouriteUpdate(@DestinationVariable Long boardId, @Payload BoardFavouriteDto dto, Authentication authentication) {
        dto.setUsername(authentication.getName());
        dto.setBoardId(boardId);
        boardService.onBoardFavourite(dto);
    }

    @MessageMapping("/{boardId}/board/name")
    public void onBoardNameUpdate(@DestinationVariable Long boardId, @Payload BoardNameDto dto, Authentication authentication) {
        dto.setUsername(authentication.getName());
        dto.setBoardId(boardId);
        messageTemplate.convertAndSend("/board/"+ boardId, boardService.onBoardNameUpdate(dto));
    }

    @MessageMapping("/{boardId}/lane/add")
    public void onLaneAdded(@DestinationVariable Long boardId, @Payload LaneAddedDto dto, Authentication authentication) {
        dto.setUsername(authentication.getName());
        dto.setBoardId(boardId);
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.onLaneAdded(dto));
    }

    @MessageMapping("/{boardId}/lane/delete")
    public void onLaneAdded(@DestinationVariable Long boardId, @Payload LaneDeletedDto dto, Authentication authentication) {
        dto.setUsername(authentication.getName());
        dto.setBoardId(boardId);
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.onLaneDeleted(dto));
    }

    @MessageMapping("/{boardId}/lane/move")
    public void onLaneMove(@DestinationVariable Long boardId, @Payload LaneMovedDto dto, Authentication authentication) {
        dto.setUsername(authentication.getName());
        dto.setBoardId(boardId);
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.onLaneMoved(dto));
    }
}
