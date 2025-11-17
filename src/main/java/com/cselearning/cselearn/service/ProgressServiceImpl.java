package com.cselearning.cselearn.service;

import com.cselearning.cselearn.model.Progress;
import com.cselearning.cselearn.repository.ProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressServiceImpl implements ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressServiceImpl(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    @Override
    public Progress saveProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    @Override
    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    @Override
    public Optional<Progress> getProgressById(Long id) {
        return progressRepository.findById(id);
    }

    @Override
    public List<Progress> getProgressByStudentId(Long studentId) {
        return progressRepository.findByStudentId(studentId);
    }

    @Override
    public List<Progress> getProgressByCourseId(Long courseId) {
        return progressRepository.findByCourseId(courseId);
    }

    @Override
    public Progress updateProgress(Long id, Progress updatedProgress) {
        return progressRepository.findById(id).map(progress -> {

            progress.setStudentId(updatedProgress.getStudentId());
            progress.setCourseId(updatedProgress.getCourseId());
            progress.setCompletionPercentage(updatedProgress.getCompletionPercentage());
            progress.setLastAccessed(updatedProgress.getLastAccessed());

            return progressRepository.save(progress);

        }).orElse(null);
    }

    @Override
    public boolean deleteProgress(Long id) {
        if (progressRepository.existsById(id)) {
            progressRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

