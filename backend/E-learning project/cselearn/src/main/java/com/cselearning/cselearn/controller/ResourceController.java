package com.cselearning.cselearn.controller;

import com.cselearning.cselearn.model.resource;
import com.cselearning.cselearn.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*")
public class ResourceController {

    @Autowired
    private ResourceRepository resourceRepository;

    @GetMapping
    public List<resource> getAllResources() {
        return resourceRepository.findAll();
    }

    @PostMapping
    public resource addResource(@RequestBody resource resource) {
        return resourceRepository.save(resource);
    }

    @PutMapping("/{id}")
    public resource updateResource(@PathVariable Long id, @RequestBody resource resourceDetails) {
        resource resource = resourceRepository.findById(id).orElseThrow();
        resource.setTitle(resourceDetails.getTitle());
        resource.setDescription(resourceDetails.getDescription());
        resource.setUnit(resourceDetails.getUnit());
        resource.setType(resourceDetails.getType());
        resource.setUrl(resourceDetails.getUrl());
        return resourceRepository.save(resource);
    }

    @DeleteMapping("/{id}")
    public String deleteResource(@PathVariable Long id) {
        resourceRepository.deleteById(id);
        return "Resource deleted successfully!";
    }
}