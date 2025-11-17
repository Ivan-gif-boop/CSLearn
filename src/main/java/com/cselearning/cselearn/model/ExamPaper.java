package com.cselearning.cselearn.model;

import jakarta.persistence.*;

@Entity
public class ExamPaper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String unit;
    private String url;  // link to PDF or file

    public ExamPaper() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
