package com.example.diplom.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Content {

    @Id
    private String id;

    private String title;
    private String projectID;
    private String phase;
    private String settings;
    private Integer sensorID;
    private Integer lensID;
    private String contentTypeID;
    private List<String> contentTypeTagID;
    private String resourceTypeID;
    private Integer colorTemperature;
    private Integer aeTarget;
    private Integer sensorGain;
    private Float shutterTime;
    private Integer sensorSubmod;
    private String comment;
    private Long size;
    private String createDate;
    private String downloadLink;

//    public Content (Content content) {
//        this.title = content.getTitle();
//        this.projectID = content.getProjectID();
//        this.phase = content.getPhase();
//        this.settings = content.getSettings();
//        this.sensorID = content.getSensorID();
//        this.lensID = content.getLensID();
//        this.contentTypeID = content.getContentTypeID();
//        this.size = content.getSize();
//        this.createDate = content.getCreateDate();
//        this.downloadLink = content.getDownloadLink();
//    }

    public Content(String title,
                   String projectID,
                   String phase,
                   String settings,
                   Integer sensorID,
                   Integer lensID,
                   String contentTypeID,
                   /*List<String> contentTypeTagID,
                   String resourceTypeID,
                   Integer colorTemperature,
                   Integer aeTarget,
                   Integer sensorGain,
                   Float shutterTime,
                   Integer sensorSubmod,
                   String comment,*/
                   Long size,
                   String createDate,
                   String downloadLink) {
        this.title = title;
        this.projectID = projectID;
        this.phase = phase;
        this.settings = settings;
        this.sensorID = sensorID;
        this.lensID = lensID;
        this.contentTypeID = contentTypeID;
        /*this.contentTypeTagID = contentTypeTagID;
        this.resourceTypeID = resourceTypeID;
        this.colorTemperature = colorTemperature;
        this.aeTarget = aeTarget;
        this.sensorGain = sensorGain;
        this.shutterTime = shutterTime;
        this.sensorSubmod = sensorSubmod;
        this.comment = comment;*/
        this.size = size;
        this.createDate = createDate;
        this.downloadLink = downloadLink;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getProjectID() {
        return projectID;
    }

    public void setProjectID(String project) {
        this.projectID = project;
    }

    public String getPhase() {
        return phase;
    }

    public void setPhase(String phase) {
        this.phase = phase;
    }

    public String getSettings() {
        return settings;
    }

    public void setSettings(String settings) {
        this.settings = settings;
    }

    public Integer getSensorID() {
        return sensorID;
    }

    public void setSensorID(Integer sensorID) {
        this.sensorID = sensorID;
    }

    public Integer getLensID() {
        return lensID;
    }

    public void setLensID(Integer lensID) {
        this.lensID = lensID;
    }

    public String getContentTypeID() {
        return contentTypeID;
    }

    public void setContentTypeID(String contentTypeID) {
        this.contentTypeID = contentTypeID;
    }

    public List<String> getContentTypeTagID() {
        return contentTypeTagID;
    }

    public void setContentTypeTagID(List<String> contentTypeTagID) {
        this.contentTypeTagID = contentTypeTagID;
    }

    public String getResourceTypeID() {
        return resourceTypeID;
    }

    public void setResourceTypeID(String resourceTypeID) {
        this.resourceTypeID = resourceTypeID;
    }

    public Integer getColorTemperature() {
        return colorTemperature;
    }

    public void setColorTemperature(Integer colorTemperature) {
        this.colorTemperature = colorTemperature;
    }

    public Integer getAeTarget() {
        return aeTarget;
    }

    public void setAeTarget(Integer aeTarget) {
        this.aeTarget = aeTarget;
    }

    public Integer getSensorGain() {
        return sensorGain;
    }

    public void setSensorGain(Integer sensorGain) {
        this.sensorGain = sensorGain;
    }

    public Float getShutterTime() {
        return shutterTime;
    }

    public void setShutterTime(Float shutterTime) {
        this.shutterTime = shutterTime;
    }

    public Integer getSensorSubmod() {
        return sensorSubmod;
    }

    public void setSensorSubmod(Integer sensorSubmod) {
        this.sensorSubmod = sensorSubmod;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }

    @Override
    public String toString() {
        return "Content{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", projectID='" + projectID + '\'' +
                ", phase='" + phase + '\'' +
                ", settings='" + settings + '\'' +
                ", sensorID=" + sensorID +
                ", lensID=" + lensID +
                ", contentTypeID='" + contentTypeID + '\'' +
                ", contentTypeTagID=" + contentTypeTagID +
                ", resourceTypeID='" + resourceTypeID + '\'' +
                ", colorTemperature=" + colorTemperature +
                ", aeTarget=" + aeTarget +
                ", sensorGain=" + sensorGain +
                ", shutterTime=" + shutterTime +
                ", sensorSubmod=" + sensorSubmod +
                ", comment='" + comment + '\'' +
                ", size=" + size +
                ", createDate='" + createDate + '\'' +
                ", downloadLink='" + downloadLink + '\'' +
                '}';
    }

}
