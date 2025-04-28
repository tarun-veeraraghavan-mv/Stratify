package com.stratify.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stratify.server.models.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
  List<Todo> findByCourseId(Long courseId);

  List<Todo> findByUserIdAndProgress(Long userId, String progress);
}
