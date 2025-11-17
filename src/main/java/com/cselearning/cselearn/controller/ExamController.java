package com.cselearning.cselearn.controller;

import com.cselearning.cselearn.model.ExamPaper;
import com.cselearning.cselearn.repository.ExamRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "*")
public class ExamController {

    private final ExamRepository examRepository;

    public ExamController(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    @GetMapping
    public List<ExamPaper> getAllExams() {
        return examRepository.findAll();
    }

    @PostMapping
    public ExamPaper addExam(@RequestBody ExamPaper examPaper) {
        return examRepository.save(examPaper);
    }

    @DeleteMapping("/{id}")
    public String deleteExam(@PathVariable Long id) {
        examRepository.deleteById(id);
        return "Exam deleted";
    }
}


