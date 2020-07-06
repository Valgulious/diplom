package com.example.diplom.service;

import com.example.diplom.model.Content;
import com.example.diplom.model.Project;
import com.example.diplom.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ContentService contentService;

    public List<Project> getAll() { return projectRepository.findAll(); }

    public Project create (String title) {
        return  projectRepository.save(new Project(title));
    }

    public Project getById (String id) { return projectRepository.findById(id).get(); }

    public void deleteById (String id ) {

        List<Content> contents = contentService.getByProject(id);

        for (Content content : contents) {
            contentService.deleteById(content.getId());
        }

        projectRepository.deleteById(id);
    }

}
