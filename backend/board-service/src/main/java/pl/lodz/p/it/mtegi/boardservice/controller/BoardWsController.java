package pl.lodz.p.it.mtegi.boardservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
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
    public void onCardAdded(@DestinationVariable Long boardId, @Payload CardAddedDto dto) {
        CardAddedDto ret = laneService.addCardToLane(dto);
        messageTemplate.convertAndSend("/board/"+ boardId, ret);
    }

    @MessageMapping("/{boardId}/card/move")
    public void onCardMoved(@DestinationVariable Long boardId, @Payload CardMovedDto dto) {
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.moveCardAcrossLanes(dto));
    }

    @MessageMapping("/{boardId}/card/delete")
    public void onCardDeleted(@DestinationVariable Long boardId, @Payload CardDeletedDto dto) {
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.deleteCard(dto));
    }

    @MessageMapping("/{boardId}/lane/update")
    public void onLaneUpdated(@DestinationVariable Long boardId, @Payload LaneUpdateDto dto) {
        dto.setBoardId(boardId);
        messageTemplate.convertAndSend("/board/"+ boardId, laneService.updateLane(dto));
    }

    @MessageMapping("/{boardId}/board/open")
    public void onBoardOpened(@DestinationVariable Long boardId, @Payload BoardOpenedDto dto) {
        dto.setBoardId(boardId);
        boardService.onBoardOpened(dto);
    }
}
