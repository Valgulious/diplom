package com.example.diplom.service;

import com.example.diplom.model.*;
import com.example.diplom.repository.*;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClients;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

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

    @Autowired
    private ResourceTypeRepository resourceTypeRepository;

//    private MongoOperations mongoOps = new MongoTemplate(new SimpleMongoDbFactory(new MongoClient(), "systemDB"));
//    private MongoOperations mongoOps = new MongoTemplate( MongoClients.create(), "systemDB");


    //Create
    public Content create(String title,
                          String project,
                          String phase,
                          String settings,
                          String sensorID,
                          String lensID,
                          String contentType,
                          String resourceType,
                          String colorTemperature,
                          String aeTarget,
                          String sensorGain,
                          String shutterTime,
                          String sensorSubmod,
                          String comment,
                          Long size,
                          String downloadLink)
    {
        Date dateNow = new Date();
        SimpleDateFormat formatForDateNow = new SimpleDateFormat("dd.MM.yyyy");
        String createDate = formatForDateNow.format(dateNow);
        String projectID = projectRepository.findByTitle(project).getId();
        String phaseID = phaseRepository.findByTitle(phase).getId();
        String settingsID = settingsRepository.findByTitle(settings).getId();
        String contentTypeID = contentTypeRepository.findByType(contentType).getId();

        Integer sensor = Integer.parseInt(sensorID);
        Integer lens = Integer.parseInt(lensID);

        String resource;
        Integer color;
        Integer ae;
        Integer gain;
        Float time;
        Integer submod;

        if (!resourceType.equals("")) {
            resource = resourceTypeRepository.findByResource(resourceType).getId();
        } else {
            resource = "";
        }

        if (!colorTemperature.equals("")) {
            color = Integer.parseInt(colorTemperature);
        } else {
            color = -1;
        }

        if (!aeTarget.equals("")) {
            ae = Integer.parseInt(aeTarget);
        } else {
            ae = -1;
        }

        if (!sensorGain.equals("")) {
            gain = Integer.parseInt(sensorGain);
        } else {
            gain = -1;
        }

        if (!shutterTime.equals("")) {
            time = (float) Double.parseDouble(shutterTime);
        } else {
            time = -1.0f;
        }

        if (!sensorSubmod.equals("")) {
            submod = Integer.parseInt(sensorSubmod);
        } else {
            submod = -1;
        }

//        System.out.println("create");


        return contentRepository.save(new Content(title, projectID, phaseID, settingsID, sensor, lens, contentTypeID,
                resource, color, ae, gain, time, submod, comment, size, createDate,
                downloadLink)
        );
    }

    //Retrieve
    public List<Content> getAll() { return contentRepository.findAll(); }

    public Content getById(String id) {

        Content content = contentRepository.findById(id).get();

        String project = projectRepository.findById(content.getProject()).get().getTitle();
        String phase = phaseRepository.findById(content.getPhase()).get().getTitle();
        String settings = settingsRepository.findById(content.getSettings()).get().getTitle();
        String contentType = contentTypeRepository.findById(content.getContentType()).get().getType();
        String resourceType = "";

        if (!content.getResourceType().equals("")) {
            resourceType = resourceTypeRepository.findById(content.getResourceType()).get().getResource();
        }

        content.setProject(project);
        content.setPhase(phase);
        content.setSettings(settings);
        content.setContentType(contentType);
        content.setResourceType(resourceType);

        return content;
    }

    public File getFileFor(String id) {

        Content content = contentRepository.findById(id).get();

        return new File(uploadPath + content.getTitle());
    }

    public Content getByTitle(String title) {

        return contentRepository.findByTitle(title);
    }
    public List<Content> getByProject(String id) { return contentRepository.findByProject(id); }

    public List<Content> getByCriteria(String searchProject,
                                       String searchPhase,
                                       String searchSettings,
                                       String searchSensor,
                                       String searchLens,
                                       String searchContent,
                                       String searchResource,
                                       String searchColor,
                                       String searchAE,
                                       String searchGain,
                                       String searchShutter,
                                       String searchSubmod)
    {

        Query query = new Query();

        if (!searchProject.equals("")) {
            Project project = projectRepository.findByTitle(searchProject);
            query.addCriteria(Criteria.where("project").is(project.getId()));
        }

        if (!searchPhase.equals("")) {
            Phase phase = phaseRepository.findByTitle(searchPhase);
            query.addCriteria(Criteria.where("phase").is(phase.getId()));
        }

        if (!searchSettings.equals("")) {
            Settings settings = settingsRepository.findByTitle(searchSettings);
            query.addCriteria(Criteria.where("settings").is(settings.getId()));
        }

        if (!searchSensor.equals("")) {
            Integer sensor = Integer.parseInt(searchSensor);
            query.addCriteria(Criteria.where("sensorID").is(sensor));
        }

        if (!searchLens.equals("")) {
            Integer lens = Integer.parseInt(searchLens);
            query.addCriteria(Criteria.where("lensID").is(lens));
        }

        if (!searchContent.equals("")) {
            ContentType contentType = contentTypeRepository.findByType(searchContent);
            query.addCriteria(Criteria.where("contentType").is(contentType.getId()));
        }

        if (!searchResource.equals("")) {
            ResourceType resourceType = resourceTypeRepository.findByResource(searchResource);
            query.addCriteria(Criteria.where("resourceType").is(resourceType.getId()));
        }

        if (!searchColor.equals("")) {
            Integer color = Integer.parseInt(searchColor);
            query.addCriteria(Criteria.where("colorTemperature").is(color));
        }

        if (!searchAE.equals("")) {
            Integer ae = Integer.parseInt(searchAE);
            query.addCriteria(Criteria.where("aeTarget").is(ae));
        }

        if (!searchGain.equals("")) {
            Integer gain = Integer.parseInt(searchGain);
            query.addCriteria(Criteria.where("sensorGain").is(gain));
        }

        if (!searchShutter.equals("")) {
            Float shutter = (float) Double.parseDouble(searchShutter);
            query.addCriteria(Criteria.where("shutterTime").is(shutter));
        }

        if (!searchSubmod.equals("")) {
            Integer submod = Integer.parseInt(searchSubmod);
            query.addCriteria(Criteria.where("sensorSubmod").is(submod));
        }

        String str = "504462df";

        char[] pass = str.toCharArray();

        ServerAddress serverAddress = new ServerAddress("127.0.0.1", 27017);
        MongoCredential mongoCredential = MongoCredential.createCredential("systemAdmin", "systemDB", pass);
        List<MongoCredential> mongoCredentials = new ArrayList<MongoCredential>();
        mongoCredentials.add(mongoCredential);


        final MongoTemplate mongoTemplate = new MongoTemplate(new MongoClient(serverAddress, mongoCredentials), "systemDB");


        return mongoTemplate.find(query, Content.class);

    }

    //Update
    public Content update(String id,
                          String title,
                          Long size,
                          String createDate,
                          String downloadLink)
    {
        Content content = contentRepository.findById(id).get();

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
        Content content = contentRepository.findById(id).get();
        Project project = projectRepository.findById(content.getProject()).get();

        File file = new File(uploadPath + project.getTitle() + "/" + content.getTitle());
        file.delete();

        contentRepository.delete(content);
    }

    //Save in server
    public void saveContent(String project,
                               String phase,
                               String settings,
                               String sensorID,
                               String lensID,
                               String contentType,
                               MultipartFile[] files,
                               String resourceType,
                               String colorTemperature,
                               String aeTarget,
                               String sensorGain,
                               String shutterTime,
                               String sensorSubmod,
                               String comment
    ) throws IOException
    {
        for (MultipartFile file : files) {
            String filename = file.getOriginalFilename();
//            System.out.println(filename);
            Long size = file.getSize();

            if (file.getOriginalFilename().length() != 0) {

                File uploadDir = new File(uploadPath + project);

                if (!uploadDir.exists()) {
                    uploadDir.mkdir();
                }

                File f = new File(uploadDir.getAbsolutePath() + "/" + filename);
                String newFilename = "";
                int i = 1;

                while (f.exists()) {
                    newFilename = "";
                    String[] s = filename.split("\\.");
                    s[s.length - 2] = s[s.length - 2] + "(" + i + ")";
                    for (int j = 0; j < s.length - 1; j++) {
                        newFilename += s[j] + ".";
                    }
                    newFilename += s[s.length - 1];
//                    f.renameTo(new File(uploadDir.getAbsolutePath() + "/" + filename));
                    f = new File(uploadDir + "/" + newFilename);
                    i++;
                }

                if (!newFilename.equals("")) {
                    filename = newFilename;
                }

//            String uuidFile = UUID.randomUUID().toString();
//            String resultFileName = uuidFile + "." + title;

                file.transferTo(f);

                 create(filename, project, phase, settings, sensorID, lensID, contentType,
                         resourceType, colorTemperature, aeTarget, sensorGain, shutterTime, sensorSubmod, comment, size,
                        downloadLink + project + "/" + filename);
            }
        }
    }


}
