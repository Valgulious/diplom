package com.example.diplom.service;

import com.example.diplom.model.Content;
import com.example.diplom.repository.ContentRepository;
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

    @Autowired
    private ContentRepository contentRepository;

    private MongoOperations mongoOps = new MongoTemplate( MongoClients.create(), "systemDB");

    //Create
//    public Content create(String title,
//                          Long size,
//                          String downloadLink)
//    {
//        Date dateNow = new Date();
//        SimpleDateFormat formatForDateNow = new SimpleDateFormat("dd.MM.yyyy hh:mm");
//        String createDate = formatForDateNow.format(dateNow);
//        return contentRepository.save(new Content(title, size, createDate, downloadLink));
//    }

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
//    public Content saveContent(MultipartFile file) throws IOException
//    {
//        String title = file.getOriginalFilename();
//        Long size = file.getSize();
//
//        if (file.getOriginalFilename().length() != 0) {
//
//            File uploadDir = new File(uploadPath);
//
//            if (!uploadDir.exists()) {
//                uploadDir.mkdir();
//            }
//
//            String uuidFile = UUID.randomUUID().toString();
//            String resultFileName = uuidFile + "." + title;
//
//            file.transferTo(new File(uploadPath + resultFileName));
//            Content content = create(title, size, "file/" + resultFileName);
//
//            return content;
//        }
//
//        return null;
//    }


}
