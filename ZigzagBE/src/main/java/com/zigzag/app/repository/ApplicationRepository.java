package com.zigzag.app.repository;

import com.zigzag.app.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findById(Long id);

    List<Application> findAllByOrderByModifiedDateDesc();
}
