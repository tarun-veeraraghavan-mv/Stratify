package com.stratify.server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stratify.server.DTOs.TodoRequest;
import com.stratify.server.models.Todo;
import com.stratify.server.payload.TodoPayload;
import com.stratify.server.payload.TodoQueryPayload;
import com.stratify.server.repository.TodoRepository;

@Service
public class TodoService {

  @Autowired
  private TodoRepository repository;

  @CacheEvict(value = { "todos", "todo" }, allEntries = true)
  public TodoPayload createTodo(Long courseId, Long userId, TodoRequest request) {
    List<String> todoErrors = new ArrayList<>();
    Todo todo = new Todo();

    todo.setName(request.getName());
    todo.setDueDate(request.getDueDate());
    todo.setProgress(request.getProgress());
    todo.setPriority(request.getPriority());
    todo.setRemarks(request.getRemarks());

    todo.setCourseId(courseId);
    todo.setUserId(userId);

    Todo createTodo = repository.save(todo);

    return new TodoPayload(todoErrors, createTodo);
  }

  @Cacheable(value = "todos")
  public TodoQueryPayload getAllTodos() {
    List<String> todoErrors = new ArrayList<>();

    List<Todo> todos = repository.findAll();

    return new TodoQueryPayload(todoErrors, todos);
  }

  public TodoQueryPayload getTodosForCourse(Long courseId) {
    List<String> todoErrors = new ArrayList<>();

    List<Todo> todos = repository.findByCourseId(courseId);

    return new TodoQueryPayload(todoErrors, todos);
  }

  @Cacheable(value = "todo", key = "#todoId")
  public TodoPayload getTodoById(Long todoId) {
    List<String> todoErrors = new ArrayList<>();

    Todo todo = repository.findById(todoId).orElseThrow(() -> new RuntimeException("Todo not found"));

    return new TodoPayload(todoErrors, todo);
  }

  @Transactional
  @CacheEvict(value = { "todos", "todo" }, allEntries = true)
  public TodoPayload updateTodoById(Long todoId, TodoRequest request) {
    List<String> todoErrors = new ArrayList<>();

    Todo todo = repository.findById(todoId).orElseThrow(() -> new RuntimeException("Todo not found"));

    if (request.getName() != null) {
      todo.setName(request.getName());
    }
    if (request.getDueDate() != null) {
      todo.setDueDate(request.getDueDate());
    }
    if (request.getProgress() != null) {
      todo.setProgress(request.getProgress());
    }
    if (request.getPriority() != null) {
      todo.setPriority(request.getPriority());
    }
    if (request.getRemarks() != null) {
      todo.setRemarks(request.getRemarks());
    }

    Todo updated = repository.save(todo);

    return new TodoPayload(todoErrors, updated);

  }

  @Transactional
  @CacheEvict(value = { "todos", "todo" }, allEntries = true)
  public TodoPayload markTodoCompleted(Long todoId) {
    List<String> todoErrors = new ArrayList<>();

    Todo todo = repository.findById(todoId).orElseThrow(() -> new RuntimeException("Todo not found"));

    todo.setProgress("Completed");

    Todo updated = repository.save(todo);

    return new TodoPayload(todoErrors, updated);
  }

  public TodoQueryPayload getCompletedTodosForUser(Long userId) {
    List<String> todoErrors = new ArrayList<>();

    List<Todo> todos = repository.findByUserIdAndProgress(userId, "Completed");

    System.out.println(todos);

    return new TodoQueryPayload(todoErrors, todos);
  }

  @Transactional
  @CacheEvict(value = { "todos", "todo" }, allEntries = true)
  public void deleteTodoById(Long todoId) {
    repository.deleteById(todoId);
  }

}
