package pl.lodz.p.it.mtegi.projectservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.mtegi.projectservice.model.Project;
import pl.lodz.p.it.mtegi.projectservice.repository.ProjectRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    public Long create(Project project) {
        return projectRepository.save(project).getId();
    }
}
