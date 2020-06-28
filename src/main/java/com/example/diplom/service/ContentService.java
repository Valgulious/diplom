package com.example.diplom.service;

import com.example.diplom.model.Content;
import com.example.diplom.model.Project;
import com.example.diplom.repository.*;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ContentService {

    @Value("${upload.path}")
    private String uploadPath;

    @Value("${download.link}")
    private String downloadLink;

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private PhaseRepository phaseRepository;

    @Autowired
    private SettingsRepository settingsRepository;

    @Autowired
    private ContentTypeRepository contentTypeRepository;

    private MongoOperations mongoOps = new MongoTemplate( MongoClients.create(), "systemDB");

    //Create
    public Content create(String title,
                          String project,
                          String phase,
                          String settings,
                          String sensorID,
                          String lensID,
                          String contentType,
                          Long size,
                          String downloadLink)
    {
        Date dateNow = new Date();
        SimpleDateFormat formatForDateNow = new SimpleDateFormat("dd.MM.yyyy hh:mm");
        String createDate = formatForDateNow.format(dateNow);
        String projectID = projectRepository.findByTitle(project).getId();
        String phaseID = phaseRepository.findByTitle(phase).getId();
        String settingsID = settingsRepository.findByTitle(settings).getId();
        String contentTypeID = contentTypeRepository.findByType(contentType).getId();

        Integer sensor = Integer.parseInt(sensorID);
        Integer lens = Integer.parseInt(lensID);


        return contentRepository.save(new Content(title, projectID, phaseID, settingsID, sensor, lens, contentTypeID,
                size, createDate, downloadLink));
    }

    //Retrieve
    public List<Content> getall() { return contentRepository.findAll(); }
    public List<Content> getByTitle(String title) { return contentRepository.findByTitle(title); }

    //Update
    public Content update(String id,
                          String title,
                          Long size,
                          String createDate,
                          String downloadLink)
    {
        Content content = mongoOps.findById(id, Content.class);

        content.setTitle(title);
        content.setSize(size);
        content.setCreateDate(createDate);
        content.setDownloadLink(downloadLink);

        return contentRepository.save(content);
    }

    //Delete
    public void deleteAll() { contentRepository.deleteAll(); }
    public void deleteById(String id)
    {
        Content content = mongoOps.findById(id, Content.class);
        contentRepository.delete(content);
    }

    //Save in server
    public Content saveContent(String project,
                               String phase,
                               String settings,
                               String sensorID,
                               String lensID,
                               String contentType,
                               MultipartFile file) throws IOException
    {
        String filename = file.getOriginalFilename();
        Long size = file.getSize();

        if (file.getOriginalFilename().length() != 0) {

            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }

//            String uuidFile = UUID.randomUUID().toString();
//            String resultFileName = uuidFile + "." + title;

            file.transferTo(new File(uploadPath + filename));

            return create(filename, project, phase, settings, sensorID, lensID, contentType, size,
                    downloadLink + filename);
        }

        return null;
    }


}
