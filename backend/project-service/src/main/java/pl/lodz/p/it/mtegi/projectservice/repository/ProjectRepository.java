package pl.lodz.p.it.mtegi.projectservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.mtegi.projectservice.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
