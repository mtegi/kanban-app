package pl.lodz.p.it.mtegi.boardservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneEditDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.service.LaneService;

@RestController
@RequestMapping("/lanes")
@RequiredArgsConstructor
public class LaneController {
    private final LaneService laneService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    LaneEditDetailsDto getLaneDetails(@PathVariable Long id) {
        return laneService.getLaneEditDetails(id);
    }
}
