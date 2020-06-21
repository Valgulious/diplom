package com.example.diplom.repository;

import com.example.diplom.model.Content;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends MongoRepository<Content, String> {

    public List<Content> findByTitle(String Title);
}
