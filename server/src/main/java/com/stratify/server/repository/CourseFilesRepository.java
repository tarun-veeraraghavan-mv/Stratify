package com.stratify.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stratify.server.models.CourseFiles;

public interface CourseFilesRepository extends JpaRepository<CourseFiles, Long> {
  List<CourseFiles> findByUserId(Long userId);
}
