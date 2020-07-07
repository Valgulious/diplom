package com.example.diplom.controller;

import com.example.diplom.model.Content;
import com.example.diplom.model.Project;
import com.example.diplom.service.ContentService;
import com.example.diplom.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ContentService contentService;

    @RequestMapping(value = "/findByTitle", method = RequestMethod.GET)
    public List<Project> findByTitle(@RequestParam String title) {
        return projectService.findByTitleStartingWith(title);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Content> find(@RequestParam String searchProject,
                              @RequestParam String searchPhase,
                              @RequestParam String searchSettings,
                              @RequestParam String searchSensor,
                              @RequestParam String searchLens,
                              @RequestParam String searchContent) {
        return contentService.getByCriteria(searchProject,
                searchPhase,
                searchSettings,
                searchSensor,
                searchLens,
                searchContent);
    }

}
