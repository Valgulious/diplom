package com.example.diplom.service;

import com.example.diplom.model.Settings;
import com.example.diplom.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository settingsRepository;

    public List<Settings> getAll() { return settingsRepository.findAll(); }

    public Settings create (String title) {
        return settingsRepository.save(new Settings(title));
    }

}
