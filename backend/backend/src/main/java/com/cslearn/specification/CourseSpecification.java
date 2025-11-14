package com.cslearn.specification;

import com.cslearn.model.Course;
import org.springframework.data.jpa.domain.Specification;

public class CourseSpecification {

    public static Specification<Course> filter(
            String title, String instructor, String description
    ) {
        return Specification.where(titleContains(title))
                .and(descriptionContains(description))
                .and(instructorNameContains(instructor));
    }

    private static Specification<Course> titleContains(String title) {
        return (root, query, cb) ->
                title == null ? null :
                        cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    private static Specification<Course> descriptionContains(String description) {
        return (root, query, cb) ->
                description == null ? null :
                        cb.like(cb.lower(root.get("description")), "%" + description.toLowerCase() + "%");
    }

    private static Specification<Course> instructorNameContains(String instructor) {
        return (root, query, cb) -> {
            if (instructor == null) return null;

            // JOIN courses -> users table
            var join = root.join("instructor");

            return cb.like(cb.lower(join.get("name")),
                    "%" + instructor.toLowerCase() + "%");
        };
    }
}
