package pl.lodz.p.it.mtegi.projectservice.service;


import pl.lodz.p.it.mtegi.projectservice.model.Project;

import java.util.List;

public interface ProjectService {
    List<Project> findAll();
    Long create(Project project);
}
