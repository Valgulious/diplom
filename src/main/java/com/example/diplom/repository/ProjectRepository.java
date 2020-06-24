package com.example.diplom.repository;

import com.example.diplom.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    public Project findByTitle(String title);

}
