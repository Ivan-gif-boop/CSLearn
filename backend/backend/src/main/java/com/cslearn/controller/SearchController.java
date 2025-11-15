package com.cslearn.controller;

import com.cslearn.model.Course;
import com.cslearn.service.SearchService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@CrossOrigin
public class SearchController {

    private final SearchService searchService;
    public SearchController(SearchService searchService) { this.searchService = searchService; }

    // Example: /api/search/courses/filter?title=java&instructor=devyan&page=0&size=5&sortBy=title&direction=asc
    @GetMapping("/courses/filter")
    public Page<Course> filterCourses(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String instructor,
            @RequestParam(required = false) String description,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "courseId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        return searchService.filterCourses(title, instructor, description, page, size, sortBy, direction);
    }
}
