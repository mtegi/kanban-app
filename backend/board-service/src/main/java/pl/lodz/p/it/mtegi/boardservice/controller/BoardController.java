package pl.lodz.p.it.mtegi.boardservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import pl.lodz.p.it.mtegi.boardservice.dto.CreateBoardDto;
import pl.lodz.p.it.mtegi.boardservice.dto.UsersBoardListDto;
import pl.lodz.p.it.mtegi.boardservice.dto.details.BoardDetailsDto;
import pl.lodz.p.it.mtegi.boardservice.model.Board;
import pl.lodz.p.it.mtegi.boardservice.service.BoardService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final BoardWsController wsController;
    private final UriComponentsBuilder uriBuilder;

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<?> createFromTemplate(@Valid @RequestBody CreateBoardDto dto, Authentication authentication){
        Board board = boardService.createFromTemplate(dto, authentication.getName());
        UriComponents uriComponents = uriBuilder.path("/boards/{id}").buildAndExpand(board.getId());
        return ResponseEntity.created(uriComponents.toUri()).build();
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/manager")
    public List<UsersBoardListDto> getUsersBoardsForManager(Authentication authentication, @RequestBody Map<String, String> body) {
        return boardService.getUsersBoardsForManager(authentication.getName(), body.get("name"));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public BoardDetailsDto getBoardDetails(@PathVariable Long id, Authentication authentication){
        return boardService.getBoardDetails(authentication.getName(), id);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/join")
    public ResponseEntity<?> joinBoard(@RequestParam String token, Authentication authentication){
        wsController.onMemberUpdate(boardService.joinBoard(token, authentication), authentication);
        return ResponseEntity.ok().build();
    }
}
