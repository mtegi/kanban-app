package pl.lodz.p.it.mtegi.boardservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.mtegi.boardservice.dto.details.CardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.service.LaneService;

@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
public class CardController {

    private final LaneService laneService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    CardDetailsDto getCardsDetails(@PathVariable String id) {
        return laneService.getCardDetails(id);
    }

}
