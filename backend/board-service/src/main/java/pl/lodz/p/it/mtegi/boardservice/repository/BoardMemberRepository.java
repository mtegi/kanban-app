package pl.lodz.p.it.mtegi.boardservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;

import java.util.List;
import java.util.Optional;

public interface BoardMemberRepository extends JpaRepository<BoardMember, Long>  {

    List<BoardMember> findAllByUsername(String username);
    Optional<BoardMember> findFirstByUsernameAndBoard_Id(String username, Long boardId);
}
