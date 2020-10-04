package pl.lodz.p.it.mtegi.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.lodz.p.it.mtegi.userservice.model.Status;
import pl.lodz.p.it.mtegi.userservice.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Modifying
    @Query("update User u set u.status = :status where u.id = :userId")
    void changeStudentStatus(@Param("userId") Long userId, @Param("status") Status status);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
