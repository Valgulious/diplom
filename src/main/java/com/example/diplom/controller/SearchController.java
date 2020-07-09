package com.example.diplom.controller;

import com.example.diplom.model.Content;
import com.example.diplom.model.Project;
import com.example.diplom.service.ContentService;
import com.example.diplom.service.ProjectService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ContentService contentService;

    @RequestMapping(value = "/findByTitle", method = RequestMethod.GET)
    public List<Project> findByTitle(@RequestParam String title) {
        return projectService.findByTitleStartingWith(title);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Content> find(@RequestParam String searchProject,
                              @RequestParam String searchPhase,
                              @RequestParam String searchSettings,
                              @RequestParam String searchSensor,
                              @RequestParam String searchLens,
                              @RequestParam String searchContent,
                              @RequestParam String searchResource,
                              @RequestParam String searchColor,
                              @RequestParam String searchAE,
                              @RequestParam String searchGain,
                              @RequestParam String searchShutter,
                              @RequestParam String searchSubmod) {
        return contentService.getByCriteria(searchProject,
                searchPhase,
                searchSettings,
                searchSensor,
                searchLens,
                searchContent,
                searchResource,
                searchColor,
                searchAE,
                searchGain,
                searchShutter,
                searchSubmod);
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void searchDownload (@RequestParam String searchProject,
                                @RequestParam String searchPhase,
                                @RequestParam String searchSettings,
                                @RequestParam String searchSensor,
                                @RequestParam String searchLens,
                                @RequestParam String searchContent,
                                @RequestParam String searchResource,
                                @RequestParam String searchColor,
                                @RequestParam String searchAE,
                                @RequestParam String searchGain,
                                @RequestParam String searchShutter,
                                @RequestParam String searchSubmod, HttpServletResponse response) throws IOException {

        List<Content> contents = contentService.getByCriteria(searchProject,
                searchPhase,
                searchSettings,
                searchSensor,
                searchLens,
                searchContent,
                searchResource,
                searchColor,
                searchAE,
                searchGain,
                searchShutter,
                searchSubmod);

        response.setStatus(HttpServletResponse.SC_OK);
        response.addHeader("Content-Disposition", "attachment; filename=searching.zip");

        ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream());

        for (Content content : contents) {

            String project = projectService.getById(content.getProject()).getTitle();

            File file = new File(uploadPath + project + "/" + content.getTitle());

            zipOutputStream.putNextEntry(new ZipEntry(file.getName()));
            FileInputStream fileInputStream = new FileInputStream(file);

            IOUtils.copy(fileInputStream, zipOutputStream);

            fileInputStream.close();
            zipOutputStream.closeEntry();
        }

        zipOutputStream.close();
    }

}
