package com.example.diplom.model;

import java.util.List;

public class Form {

    private List<Project> projects;
    private List<Phase> phases;
    private List<Settings> settings;
    private List<ContentType> contentTypes;
    private List<ResourceType> resourceTypes;

    public Form(List<Project> projects,
                List<Phase> phases,
                List<Settings> settings,
                List<ContentType> contentTypes,
                List<ResourceType> resourceTypes) {
        this.projects = projects;
        this.phases = phases;
        this.settings = settings;
        this.contentTypes = contentTypes;
        this.resourceTypes = resourceTypes;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Phase> getPhases() {
        return phases;
    }

    public void setPhases(List<Phase> phases) {
        this.phases = phases;
    }

    public List<Settings> getSettings() {
        return settings;
    }

    public void setSettings(List<Settings> settings) {
        this.settings = settings;
    }

    public List<ContentType> getContentTypes() {
        return contentTypes;
    }

    public void setContentTypes(List<ContentType> contentTypes) {
        this.contentTypes = contentTypes;
    }

    public List<ResourceType> getResourceTypes() {
        return resourceTypes;
    }

    public void setResourceTypes(List<ResourceType> resourceTypes) {
        this.resourceTypes = resourceTypes;
    }
}
