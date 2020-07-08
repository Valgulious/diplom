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
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    @Autowired
    private ContentService contentService;

    @Value("${upload.path}")
    private String uploadPath;

    @RequestMapping(method = RequestMethod.POST)
    public void create(@RequestParam String project,
                         @RequestParam String phase,
                         @RequestParam String settings,
                         @RequestParam String sensorID,
                         @RequestParam String lensID,
                         @RequestParam String contentType,
                         @RequestParam("files[]") MultipartFile[] files,
                         @RequestParam String resourceType,
                         @RequestParam String colorTemperature,
                         @RequestParam String aeTarget,
                         @RequestParam String sensorGain,
                         @RequestParam String shutterTime,
                         @RequestParam String sensorSubmod,
                         @RequestParam String comment)
            throws IOException
    {
        contentService.saveContent(project,
                phase,
                settings,
                sensorID,
                lensID,
                contentType,
                files,
                resourceType,
                colorTemperature,
                aeTarget,
                sensorGain,
                shutterTime,
                sensorSubmod,
                comment
        );
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public String getAll() { return "get all"; }

//    @RequestMapping(value = "/getByTitle", method = RequestMethod.GET)
//    public List<Content> getByTitle(@RequestParam String title)
//    {
//        List<Content> content = contentService.getByTitle(title);
//
//        return content;
//    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Content getContentById(@PathVariable String id) {
        return contentService.getById(id);
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.GET)
    public List<Content> getContentByProjectId(@PathVariable String id) {
        return contentService.getByProject(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteById(@PathVariable String id) { contentService.deleteById(id); }

}
