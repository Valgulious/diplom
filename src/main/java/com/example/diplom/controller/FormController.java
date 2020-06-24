package com.example.diplom.controller;

import com.example.diplom.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/form")
public class FormController {

    @Autowired
    private FormService formService;

    @RequestMapping(method = RequestMethod.GET)
    public String getForm() throws IOException { return formService.getForm(); }

}
