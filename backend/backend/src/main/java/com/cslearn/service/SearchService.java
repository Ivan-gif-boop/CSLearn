package com.cslearn.service;

import com.cslearn.model.Course;
import com.cslearn.repository.CourseRepository;
import com.cslearn.specification.CourseSpecification;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final CourseRepository courseRepo;

    public SearchService(CourseRepository courseRepo) {
        this.courseRepo = courseRepo;
    }

    // Multi-parameter filtering for courses
    public Page<Course> filterCourses(String title, String instructor, String description,
                                      int page, int size, String sortBy, String direction) {

        // ✅ Ensure sortBy is a valid property
        List<String> allowedFields = List.of("courseId", "title", "description", "instructor", "createdAt");
        if (!allowedFields.contains(sortBy)) {
            sortBy = "courseId"; // fallback default
        }

        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return courseRepo.findAll(CourseSpecification.filter(title, instructor, description), pageable);
    }
}
