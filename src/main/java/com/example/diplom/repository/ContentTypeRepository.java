package com.example.diplom.repository;

import com.example.diplom.model.ContentType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentTypeRepository extends MongoRepository <ContentType, String> {

    public ContentType findByType(String type);

}
