package com.cslearn.model;

import jakarta.persistence.*;

@Entity
@Table(name = "assessments")
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assessment_id;

    private String title;
    private String type;
    private int total_marks;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    // Getters & Setters
    public Long getAssessment_id() { return assessment_id; }
    public void setAssessment_id(Long assessment_id) { this.assessment_id = assessment_id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public int getTotal_marks() { return total_marks; }
    public void setTotal_marks(int total_marks) { this.total_marks = total_marks; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
