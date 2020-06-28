package com.example.diplom.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Settings {

    @Id
    private String id;

    private String title;

    public Settings(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Settings{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
