package pl.lodz.p.it.mtegi.boardservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.mtegi.boardservice.dto.TimeEntryDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.TimeEntryDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.service.TimeEntryService;

import java.util.List;

@RestController
@RequestMapping("/time-entries")
@RequiredArgsConstructor
public class TimeEntryController {
    private final TimeEntryService timeEntryService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<?> createTimeEntry(@RequestBody TimeEntryDto timeEntryDto, Authentication authentication) {
        timeEntryDto.setUsername(authentication.getName());
        timeEntryService.createTimeEntry(timeEntryDto);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public List<TimeEntryDetailsDto> getAllForUser(Authentication authentication) {
        return timeEntryService.getAllForUser(authentication.getName());
    }
}
