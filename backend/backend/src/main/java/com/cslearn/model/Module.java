package com.cslearn.model;

import jakarta.persistence.*;

@Entity
@Table(name = "modules")
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long module_id;

    private String title;
    private int position;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    // Getters & Setters
    public Long getModule_id() { return module_id; }
    public void setModule_id(Long module_id) { this.module_id = module_id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public int getPosition() { return position; }
    public void setPosition(int position) { this.position = position; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
