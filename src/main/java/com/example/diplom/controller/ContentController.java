package com.example.diplom.controller;

import com.example.diplom.model.Content;
import com.example.diplom.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/content")
public class ContentController {

    @Autowired
    private ContentService contentService;

    @Value("${upload.path}")
    private String uploadPath;

//    @RequestMapping(value = "/create", method = RequestMethod.POST)
//    public String create(@RequestParam("file") MultipartFile file) throws IOException
//    {
//        Content content = contentService.saveContent(file);
//        return content.toString();
//    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public String getAll() { return "get all"; }

    @RequestMapping(value = "/getByTitle", method = RequestMethod.GET)
    public List<Content> getByTitle(@RequestParam String title)
    {
        List<Content> content = contentService.getByTitle(title);

        return content;
    }

}
