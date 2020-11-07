package pl.lodz.p.it.mtegi.boardservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import pl.lodz.p.it.mtegi.boardservice.dto.events.CardAddedDto;
import pl.lodz.p.it.mtegi.boardservice.service.LaneService;

@Controller
@RequiredArgsConstructor
public class BoardWsController {

    private final LaneService laneService;

//    @MessageMapping("/board")
//    @SendToUser("/queue/messages")
//    public BoardDetailsDto send() throws Exception {
//        return boardService.getBoardDetails((long) 0);
//    }

    @MessageMapping("/add")
    @SendTo("/topic/greetings")
    public CardAddedDto onCardAdded(@Payload CardAddedDto dto) throws Exception {
        return laneService.addCardToLane(dto);
    }
}
