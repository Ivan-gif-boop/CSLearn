package com.cselearning.cselearn.repository;

import com.cselearning.cselearn.model.ExamPaper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<ExamPaper, Long> {
}
