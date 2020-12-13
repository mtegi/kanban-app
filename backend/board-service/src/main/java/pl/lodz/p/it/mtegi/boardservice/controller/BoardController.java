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

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    private final UriComponentsBuilder uriBuilder;

    @GetMapping
    public List<Board> getAll() {
        return boardService.findAll();
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<?> createFromTemplate(@Valid @RequestBody CreateBoardDto dto, Authentication authentication){
        Board board = boardService.createFromDefaultTemplate(dto, authentication.getName());
        UriComponents uriComponents = uriBuilder.path("/boards/{id}").buildAndExpand(board.getId());
        return ResponseEntity.created(uriComponents.toUri()).build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/manager")
    public List<UsersBoardListDto> getUsersBoardsForManager(Authentication authentication) {
        return boardService.getUsersBoardsForManager(authentication.getName());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public BoardDetailsDto getBoardDetails(@PathVariable Long id, Authentication authentication){
        return boardService.getBoardDetails(authentication.getName(), id);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/join")
    public ResponseEntity<?> joinBoard(@RequestParam String token, Authentication authentication){
        boardService.joinBoard(token, authentication);
        return ResponseEntity.ok().build();
    }
}
