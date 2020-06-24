package com.example.diplom.controller;

import com.example.diplom.model.Settings;
import com.example.diplom.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    @RequestMapping(method = RequestMethod.POST)
    public String create (@RequestParam String title) {
        return settingsService.create(title).toString();
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Settings> getAll() {
        return settingsService.getAll();
    }

}
