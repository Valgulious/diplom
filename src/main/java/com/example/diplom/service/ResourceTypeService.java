package com.example.diplom.service;

import com.example.diplom.model.ResourceType;
import com.example.diplom.repository.ResourceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceTypeService {

    @Autowired
    private ResourceTypeRepository resourceTypeRepository;

    public List<ResourceType> getAll() { return resourceTypeRepository.findAll(); }

    public ResourceType create (String resource) {
        return resourceTypeRepository.save(new ResourceType(resource));
    }

}
