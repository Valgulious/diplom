package com.example.diplom.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Phase {

    @Id
    private String id;

    private String title;

    public Phase(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Phase{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
