package com.cselearning.cselearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cselearning.cselearn.model.resource;

public interface ResourceRepository extends JpaRepository<resource, Long> {
}