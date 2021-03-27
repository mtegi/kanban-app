package pl.lodz.p.it.mtegi.boardservice.service;

import pl.lodz.p.it.mtegi.boardservice.dto.TimeEntryDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.TimeEntryDetailsDto;

import java.util.List;

public interface TimeEntryService {
    void createTimeEntry(TimeEntryDto dto);
    List<TimeEntryDetailsDto> getAllForUser(String name);
    void deleteById(Long id, String username);
}
