package com.example.diplom.controller;

import com.example.diplom.model.Content;
import com.example.diplom.model.Project;
import com.example.diplom.service.ContentService;
import com.example.diplom.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ContentService contentService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Project> getAll() { return projectService.getAll(); }

    @RequestMapping(method = RequestMethod.POST)
    public String create (@RequestParam String title) {
        return projectService.create(title).toString();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public List<Content> getContent (@PathVariable String id) {
        return contentService.getByProjectID(id);
    }

}
