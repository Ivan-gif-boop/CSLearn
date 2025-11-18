package com.cslearn.repository;

import com.cslearn.model.Course;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.*;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course> {
    List<Course> findByTitleContainingIgnoreCase(String keyword);

    @Query("""
        SELECT c FROM Course c
        JOIN c.instructor i
        WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(i.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    Page<Course> filterByMultipleFields(@Param("keyword") String keyword, Pageable pageable);
}
