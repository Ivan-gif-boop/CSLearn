package com.cselearning.cselearn.service;

import com.cselearning.cselearn.model.Progress;

import java.util.List;
import java.util.Optional;

public interface ProgressService {

    Progress saveProgress(Progress progress);

    List<Progress> getAllProgress();

    Optional<Progress> getProgressById(Long id);

    Progress updateProgress(Long id, Progress updatedProgress);

    boolean deleteProgress(Long id);

    List<Progress> getProgressByStudentId(Long studentId);

    List<Progress> getProgressByCourseId(Long courseId);
}
