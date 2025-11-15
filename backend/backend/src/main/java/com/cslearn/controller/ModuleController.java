package com.cslearn.controller;

import com.cslearn.model.Module;
import com.cslearn.repository.ModuleRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin
public class ModuleController {

    private final ModuleRepository moduleRepository;

    public ModuleController(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    @GetMapping
    public List<Module> getModulesByCourse(@RequestParam Long courseId) {
        return moduleRepository.findByCourseCourseId(courseId);
    }
}
