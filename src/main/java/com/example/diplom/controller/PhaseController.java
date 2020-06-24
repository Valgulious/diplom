package com.example.diplom.controller;

import com.example.diplom.model.Phase;
import com.example.diplom.service.PhaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/phases")
public class PhaseController {

    @Autowired
    private PhaseService phaseService;

    @RequestMapping(method = RequestMethod.POST)
    public String create (@RequestParam String title) {
        return phaseService.create(title).toString();
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Phase> getAll() { return phaseService.getAll(); }

}
