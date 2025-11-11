package com.cslearn.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long course_id;

    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private User instructor;

    private Timestamp created_at;

    // Getters & Setters
    public Long getCourse_id() { return course_id; }
    public void setCourse_id(Long course_id) { this.course_id = course_id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public User getInstructor() { return instructor; }
    public void setInstructor(User instructor) { this.instructor = instructor; }
}
