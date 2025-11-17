package com.cselearning.cselearn.controller;

import com.cselearning.cselearn.model.Progress;
import com.cselearning.cselearn.service.ProgressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    private final ProgressService progressService;

    // Add @Autowired for constructor injection (optional but good practice)

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    // Create new progress - return ResponseEntity for better HTTP status control
    @PostMapping
    public ResponseEntity<Progress> createProgress(@RequestBody Progress progress) {
        try {
            Progress savedProgress = progressService.saveProgress(progress);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProgress);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // Get all progress records
    @GetMapping
    public ResponseEntity<List<Progress>> getAllProgress() {
        try {
            List<Progress> progressList = progressService.getAllProgress();
            return ResponseEntity.ok(progressList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get progress by ID - return 404 if not found
    @GetMapping("/{id}")
    public ResponseEntity<Progress> getProgressById(@PathVariable Long id) {
        try {
            Optional<Progress> progress = progressService.getProgressById(id);
            return progress.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get all progress for a specific student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Progress>> getProgressByStudent(@PathVariable Long studentId) {
        try {
            List<Progress> progressList = progressService.getProgressByStudentId(studentId);
            return ResponseEntity.ok(progressList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update existing progress - return 404 if not found
    @PutMapping("/{id}")
    public ResponseEntity<Progress> updateProgress(@PathVariable Long id, @RequestBody Progress updatedProgress) {
        try {
            Progress progress = progressService.updateProgress(id, updatedProgress);
            if (progress != null) {
                return ResponseEntity.ok(progress);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // Delete a progress record - return 404 if not found
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgress(@PathVariable Long id) {
        try {
            boolean deleted = progressService.deleteProgress(id);
            if (deleted) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}