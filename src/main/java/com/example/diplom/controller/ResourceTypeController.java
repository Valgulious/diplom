package com.example.diplom.controller;

import com.example.diplom.model.ResourceType;
import com.example.diplom.service.ResourceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/resource_types")
public class ResourceTypeController {

    @Autowired
    private ResourceTypeService resourceTypeService;

    @RequestMapping(method = RequestMethod.POST)
    public String create (@RequestParam String resource) {
        return resourceTypeService.create(resource).toString();
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<ResourceType> getAll() { return resourceTypeService.getAll(); }

}
