package pl.lodz.p.it.mtegi.boardservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.mtegi.boardservice.model.BoardMember;

import java.util.List;

public interface BoardMemberRepository extends JpaRepository<BoardMember, Long>  {

    List<BoardMember> findAllByUsername(String username);
}
