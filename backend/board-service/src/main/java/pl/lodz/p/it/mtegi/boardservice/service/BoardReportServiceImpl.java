package pl.lodz.p.it.mtegi.boardservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.boardservice.dto.details.LaneDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.dto.report.BoardReportDto;
import pl.lodz.p.it.mtegi.boardservice.dto.report.MemberTaskNumberDto;
import pl.lodz.p.it.mtegi.boardservice.exception.BoardError;
import pl.lodz.p.it.mtegi.boardservice.feign.UserServiceClient;
import pl.lodz.p.it.mtegi.boardservice.model.AssignedCard;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;
import pl.lodz.p.it.mtegi.boardservice.model.Lane;
import pl.lodz.p.it.mtegi.boardservice.repository.BoardRepository;
import pl.lodz.p.it.mtegi.common.dto.BoardMemberDetailsDto;
import pl.lodz.p.it.mtegi.common.exception.ApplicationException;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardReportServiceImpl implements BoardReportService {
    private final BoardRepository boardRepository;
    private final UserServiceClient userService;

    @Override
    public BoardReportDto getReportData(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new ApplicationException(BoardError.NOT_FOUND));
        List<Lane> lanes = board.getLanes();
        BoardReportDto dto = new BoardReportDto();
        lanes.sort(Comparator.comparing(Lane::getIndex));
        int closedTasks = lanes.get(lanes.size() - 1).getCards().size();
        int openTasks = 0;
        for(int i =0; i<=lanes.size() - 2; i++){
            openTasks += lanes.get(i).getCards().size();
        }
        dto.setClosed(closedTasks);
        dto.setOpen(openTasks);

        List<String> usernames = board.getMembers().stream().map(BoardMember::getUsername).collect(Collectors.toList());
        List<BoardMemberDetailsDto> memberDetailsDtos =  userService.getBoardMembersDetails(usernames, boardId);
        List<MemberTaskNumberDto> memberTaskNumberDtos = board.getMembers().stream().map(m -> new MemberTaskNumberDto(memberDetailsDtos.stream().filter(d -> d.getUsername().equals(m.getUsername())).findFirst().orElseGet(() -> new BoardMemberDetailsDto(m.getUsername())).getName(), m.getAssignedCards() == null ? 0 : m.getAssignedCards().size())).filter(d -> d.getTaskNumber() > 0).collect(Collectors.toList());
        int unassigned = 0;
        for(int i=0; i<board.getLanes().size(); i++){
            for(int j=0; j<board.getLanes().get(i).getCards().size(); j++){
                Set<AssignedCard> assignedCards = board.getLanes().get(i).getCards().get(j).getMembers();
                if(assignedCards == null || assignedCards.isEmpty()){
                    unassigned++;
                }
            }
        }
        memberTaskNumberDtos.add(new MemberTaskNumberDto("unassigned", unassigned));
        dto.setMemberTasks(memberTaskNumberDtos);
        return dto;
    }
}
