package com.cslearn.controller;

import com.cslearn.model.Assessment;
import com.cslearn.repository.AssessmentRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin
public class AssessmentController {

    private final AssessmentRepository assessmentRepository;

    public AssessmentController(AssessmentRepository assessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }

    @GetMapping
    public List<Assessment> getAssessmentsByCourse(@RequestParam Long courseId) {
        return assessmentRepository.findByCourseCourseId(courseId);
    }
}
