package com.example.diplom.service;

import com.example.diplom.model.*;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class FormService {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private PhaseService phaseService;

    @Autowired
    private SettingsService settingsService;

    @Autowired
    private ContentTypeService contentTypeService;

    @Autowired
    private ResourceTypeService resourceTypeService;

    @Autowired
    public String getForm() throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        List<Project> projects = projectService.getAll();
        List<Phase> phases = phaseService.getAll();
        List<Settings> settings = settingsService.getAll();
        List<ContentType> contentTypes = contentTypeService.getAll();
        List<ResourceType> resourceTypes = resourceTypeService.getAll();

        Form form = new Form(projects, phases, settings, contentTypes, resourceTypes);

        return mapper.writeValueAsString(form);

    }

}
