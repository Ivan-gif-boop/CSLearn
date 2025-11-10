package com.cselearning.cselearn.model;

import jakarta.persistence.*;

@Entity
@Table(name = "resources")
public class resource{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String unit;
    private String type; // e.g. lecture note, past paper, coding problem
    private String url;  // link to file or resource

    // Default constructor
    public resource() {}

    // Parameterized constructor
    public resource(String title, String description, String unit, String type, String url) {
        this.title = title;
        this.description = description;
        this.unit = unit;
        this.type = type;
        this.url = url;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}