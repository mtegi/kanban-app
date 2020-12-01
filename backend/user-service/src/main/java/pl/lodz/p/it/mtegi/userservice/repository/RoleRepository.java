package pl.lodz.p.it.mtegi.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.mtegi.userservice.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
