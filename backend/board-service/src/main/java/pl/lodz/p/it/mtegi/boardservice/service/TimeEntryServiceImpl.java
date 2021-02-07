package pl.lodz.p.it.mtegi.boardservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.boardservice.dto.TimeEntryDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.TimeEntryDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.exception.BoardError;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;
import pl.lodz.p.it.mtegi.boardservice.model.Card;
import pl.lodz.p.it.mtegi.boardservice.model.TimeEntry;
import pl.lodz.p.it.mtegi.boardservice.repository.BoardMemberRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.CardRepository;
import pl.lodz.p.it.mtegi.boardservice.repository.TimeEntryRepository;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TimeEntryServiceImpl implements TimeEntryService {

    private final CardRepository cardRepository;
    private final BoardMemberRepository memberRepository;
    private final TimeEntryRepository timeEntryRepository;

    @Override
    public void createTimeEntry(TimeEntryDto dto) {
        if(dto.getFrom().isAfter(dto.getTo())){
            throw new ApplicationException(BoardError.TIME_ENTRY_DATE_ERROR);
        }
        BoardMember boardMember = memberRepository.findFirstByUsernameAndBoard_Id(dto.getUsername(), dto.getBoardId()).orElseThrow(() -> new ApplicationException(BoardError.MEMBER_NOT_FOUND));
        Card card = cardRepository.findById(dto.getCardId()).orElseThrow(() -> new ApplicationException(BoardError.CARD_NOT_FOUND));
        TimeEntry timeEntry = new TimeEntry(card, boardMember, dto.getFrom(), dto.getTo());
        timeEntryRepository.save(timeEntry);
    }

    @Override
    public List<TimeEntryDetailsDto> getAllForUser(String name) {
        return timeEntryRepository.findAllByMember_Username(name).stream().map(timeEntry -> {
            TimeEntryDetailsDto dto = new TimeEntryDetailsDto();
            Card card = cardRepository.findById(timeEntry.getCard().getId()).orElseThrow(() -> new ApplicationException(BoardError.CARD_NOT_FOUND));
            dto.setId(timeEntry.getId());
            dto.setTitle(card.getTitle());
            dto.setFrom(timeEntry.getFromDate());
            dto.setTo(timeEntry.getToDate());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id, String username) {
        TimeEntry entry = timeEntryRepository.getOne(id);
        if(entry.getMember().getUsername().equals(username)){
            timeEntryRepository.deleteById(id);
        } else {
            throw new ApplicationException(BoardError.TIME_ENTRY_CANNOT_DELETE);
        }
    }
}
