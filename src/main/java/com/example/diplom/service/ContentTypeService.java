package com.example.diplom.service;

import com.example.diplom.model.ContentType;
import com.example.diplom.repository.ContentRepository;
import com.example.diplom.repository.ContentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentTypeService {

    @Autowired
    private ContentTypeRepository contentTypeRepository;

    public List<ContentType> getAll() { return contentTypeRepository.findAll(); }

    public ContentType create (String type) {
        return contentTypeRepository.save(new ContentType(type));
    }

}
