package com.cslearn.specification;

import com.cslearn.model.Course;
import org.springframework.data.jpa.domain.Specification;

public class CourseSpecification {

    public static Specification<Course> filter(
            String title, String instructor, String description
    ) {
        return Specification.allOf(
                titleContains(title),
                descriptionContains(description),
                instructorNameContains(instructor)
        );
    }

    private static Specification<Course> titleContains(String title) {
        if (title == null || title.isEmpty()) return null;

        return (root, query, cb) ->
                cb.like(cb.lower(root.get("title")),
                        "%" + title.toLowerCase() + "%");
    }

    private static Specification<Course> descriptionContains(String description) {
        if (description == null || description.isEmpty()) return null;

        return (root, query, cb) ->
                cb.like(cb.lower(root.get("description")),
                        "%" + description.toLowerCase() + "%");
    }

    private static Specification<Course> instructorNameContains(String instructor) {
        if (instructor == null || instructor.isEmpty()) return null;

        return (root, query, cb) -> {
            var join = root.join("instructor");
            return cb.like(cb.lower(join.get("name")),
                    "%" + instructor.toLowerCase() + "%");
        };
    }
}
