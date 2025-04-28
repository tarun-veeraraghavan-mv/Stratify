package com.stratify.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stratify.server.models.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
  List<Course> findByUserId(Long userId);
}
