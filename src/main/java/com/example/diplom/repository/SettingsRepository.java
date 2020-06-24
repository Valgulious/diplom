package com.example.diplom.repository;

import com.example.diplom.model.Settings;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsRepository extends MongoRepository<Settings, String> {

    public Settings findByTitle (String title);

}
