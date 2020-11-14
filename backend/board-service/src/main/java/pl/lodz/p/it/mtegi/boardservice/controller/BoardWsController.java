package pl.lodz.p.it.mtegi.boardservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardAddedDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardDeletedDto;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardMovedDto;
import pl.lodz.p.it.mtegi.boardservice.service.LaneService;

@Controller
@RequiredArgsConstructor
public class BoardWsController {

    private final LaneService laneService;
    private final SimpMessageSendingOperations messageTemplate;

//    @MessageMapping("/board")
//    @SendToUser("/queue/messages")
//    public BoardDetailsDto send() throws Exception {
//        return boardService.getBoardDetails((long) 0);
//    }

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
}
