package com.example.diplom.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ContentTypeTag {

    @Id
    private String id;

    private String tag;

    public ContentTypeTag(String tag) {
        this.tag = tag;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return "ContentTypeTag{" +
                "id='" + id + '\'' +
                ", tag='" + tag + '\'' +
                '}';
    }
}
