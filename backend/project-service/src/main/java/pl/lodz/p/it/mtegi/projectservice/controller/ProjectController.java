package pl.lodz.p.it.mtegi.projectservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import pl.lodz.p.it.mtegi.projectservice.model.Project;
import pl.lodz.p.it.mtegi.projectservice.service.ProjectService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    private final UriComponentsBuilder uriBuilder;

    @GetMapping
    public List<Project> getAll() {
        return projectService.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Project project) {
        Long id = projectService.create(project);
        UriComponents uriComponents = uriBuilder.path("/{id}").buildAndExpand(id);
        return ResponseEntity.created(uriComponents.toUri()).build();
    }
}
