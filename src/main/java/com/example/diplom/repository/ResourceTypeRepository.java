package com.example.diplom.repository;

import com.example.diplom.model.ResourceType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceTypeRepository extends MongoRepository<ResourceType, String> {

    public ResourceType findByResource (String resource);

}
