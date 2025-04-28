package com.stratify.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stratify.server.DTOs.TodoRequest;
import com.stratify.server.payload.TodoPayload;
import com.stratify.server.payload.TodoQueryPayload;
import com.stratify.server.security.UserPrincipal;
import com.stratify.server.services.TodoService;

@RestController
@RequestMapping("/todos")
public class TodoController {

  @Autowired
  private TodoService service;

  @PostMapping("/byCourseId/{courseId}")
  public TodoPayload createTodo(@PathVariable Long courseId, @AuthenticationPrincipal UserPrincipal principal,
      @RequestBody TodoRequest request) {

    return service.createTodo(courseId, principal.getUserId(), request);

  }

  @GetMapping("/")
  public TodoQueryPayload getTodos() {
    return service.getAllTodos();
  }

  @GetMapping("/byCourseId/{courseId}")
  public TodoQueryPayload getTodosForUser(@PathVariable Long courseId) {
    return service.getTodosForCourse(courseId);
  }

  @GetMapping("/{id}")
  public TodoPayload getTodoById(@PathVariable Long id) {
    return service.getTodoById(id);
  }

  @GetMapping("/completed")
  public TodoQueryPayload getCompletedTodos(
      @AuthenticationPrincipal UserPrincipal principal) {
    return service.getCompletedTodosForUser(principal.getUserId());
  }

  @PatchMapping("/{id}")
  public TodoPayload updateTodoById(@PathVariable Long id, @RequestBody TodoRequest request) {
    return service.updateTodoById(id, request);
  }

  @PatchMapping("/markCompleted/{id}")
  public TodoPayload markCompletedTodo(@PathVariable Long id) {
    return service.markTodoCompleted(id);
  }

  @DeleteMapping("/{id}")
  public void deleteTodoById(@PathVariable Long id) {
    service.deleteTodoById(id);
  }

}
