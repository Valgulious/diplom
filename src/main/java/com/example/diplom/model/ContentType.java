package com.example.diplom.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ContentType {

    @Id
    private String id;

    private String type;

    public ContentType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "ContentType{" +
                "id='" + id + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
