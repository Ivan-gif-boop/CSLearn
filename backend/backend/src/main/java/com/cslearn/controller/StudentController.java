package com.cslearn.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    @GetMapping("/student/test")
    public String studentOnly() {
        return "Welcome Student! You have student access.";
    }
}
