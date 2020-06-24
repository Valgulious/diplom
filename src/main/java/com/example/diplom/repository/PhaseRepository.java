package com.example.diplom.repository;

import com.example.diplom.model.Phase;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhaseRepository extends MongoRepository<Phase, String> {

    public Phase findByTitle (String title);

}
