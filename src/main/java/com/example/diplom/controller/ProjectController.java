package com.example.diplom.controller;

import com.example.diplom.model.Content;
import com.example.diplom.model.Project;
import com.example.diplom.service.ContentService;
import com.example.diplom.service.ProjectService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Value("${upload.path}")
    private String uploadPath;

        @Autowired
        private ProjectService projectService;

        @Autowired
        private ContentService contentService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Project> getAll() { return projectService.getAll(); }

    @RequestMapping(value = "/byTitle", method = RequestMethod.GET)
    public boolean byTitle(@RequestParam String title) {
        return projectService.findByTitle(title) != null;
    }

    @RequestMapping(value = "/getByTitle", method = RequestMethod.GET)
    public Project getByTitle(@RequestParam String title) { return projectService.findByTitle(title); }


    @RequestMapping(method = RequestMethod.POST)
    public String create (@RequestParam String title) {
        return projectService.create(title).toString();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Project getProject (@PathVariable String id) {
        return projectService.getById(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteById (@PathVariable String id) { projectService.deleteById(id); }

    @RequestMapping(value = "/download/{id}", method = RequestMethod.GET, produces = "application/zip")
    public void zipFiles(@PathVariable String id, HttpServletResponse response) throws IOException {

        Project project = projectService.getById(id);

        //setting headers
        response.setStatus(HttpServletResponse.SC_OK);
        response.addHeader("Content-Disposition", "attachment; filename=" + project.getTitle() + ".zip");

        ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream());

        // create a list to add files to be zipped
//        ArrayList<File> files = new ArrayList<>(2);
//        files.add(new File("README.md"));

        List<Content> contents = contentService.getByProject(id);

        // package files
        for (Content content : contents) {
            //new zip entry and copying inputstream with file to zipOutputStream, after all closing streams

            File file = new File(uploadPath + project.getTitle() + "/" + content.getTitle());

            zipOutputStream.putNextEntry(new ZipEntry(file.getName()));
            FileInputStream fileInputStream = new FileInputStream(file);

            IOUtils.copy(fileInputStream, zipOutputStream);

            fileInputStream.close();
            zipOutputStream.closeEntry();
        }

        zipOutputStream.close();
    }

}
