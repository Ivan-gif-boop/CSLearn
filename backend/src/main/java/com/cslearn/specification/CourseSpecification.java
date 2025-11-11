package com.cslearn.specification;

import com.cslearn.model.Course;
import org.springframework.data.jpa.domain.Specification;

public class CourseSpecification {
    public static Specification<Course> filter(String title, String instructor, String description) {
        return (root, query, cb) -> {
            var predicate = cb.conjunction();

            if (title != null && !title.isEmpty())
                predicate = cb.and(predicate, cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));

            if (description != null && !description.isEmpty())
                predicate = cb.and(predicate, cb.like(cb.lower(root.get("description")), "%" + description.toLowerCase() + "%"));

            if (instructor != null && !instructor.isEmpty())
                predicate = cb.and(predicate, cb.like(cb.lower(root.join("instructor").get("name")), "%" + instructor.toLowerCase() + "%"));

            return predicate;
        };
    }
}
