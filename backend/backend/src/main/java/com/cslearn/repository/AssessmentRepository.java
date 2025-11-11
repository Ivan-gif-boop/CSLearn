package com.cslearn.repository;

import com.cslearn.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long>, JpaSpecificationExecutor<Assessment> {
    List<Assessment> findByTitleContainingIgnoreCase(String keyword);
}
