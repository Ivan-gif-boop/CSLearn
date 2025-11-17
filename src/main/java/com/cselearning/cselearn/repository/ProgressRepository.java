
package com.cselearning.cselearn.repository;

import com.cselearning.cselearn.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findByStudentId(Long studentId);
    List<Progress> findByCourseId(Long courseId);
}
