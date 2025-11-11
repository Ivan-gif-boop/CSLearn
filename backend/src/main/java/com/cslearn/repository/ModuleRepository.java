package com.cslearn.repository;

import com.cslearn.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Long>, JpaSpecificationExecutor<Module> {
    List<Module> findByTitleContainingIgnoreCase(String keyword);
}
