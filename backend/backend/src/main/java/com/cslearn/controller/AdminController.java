package com.cslearn.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @GetMapping("/admin/test")
    public String adminOnly() {
        return "Welcome Admin! You have admin access.";
    }
}
