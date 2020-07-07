package com.example.diplom.repository;

import com.example.diplom.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    public Project findByTitle(String id);
    public List<Project> findByTitleStartingWith(String title);

}
