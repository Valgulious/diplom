package com.example.diplom.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ResourceType {

    @Id
    private String id;

    private String resource;

    public ResourceType(String resource) {
        this.resource = resource;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    @Override
    public String toString() {
        return "ResourceType{" +
                "id='" + id + '\'' +
                ", resource='" + resource + '\'' +
                '}';
    }
}
