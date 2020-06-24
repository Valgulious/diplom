package com.example.diplom.controller;

import com.example.diplom.model.ContentType;
import com.example.diplom.service.ContentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/content_types")
public class ContentTypeController {

    @Autowired
    private ContentTypeService contentTypeService;

    @RequestMapping(method = RequestMethod.POST)
    public String create (@RequestParam String title) {
        return contentTypeService.create(title).toString();
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<ContentType> getAll() { return contentTypeService.getAll(); }

}
