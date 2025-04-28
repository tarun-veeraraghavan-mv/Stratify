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

import com.stratify.server.DTOs.CourseRequest;
import com.stratify.server.payload.CoursePayload;
import com.stratify.server.payload.CourseQueryPayload;
import com.stratify.server.security.UserPrincipal;
import com.stratify.server.services.CourseService;

@RestController()
@RequestMapping("/courses")
public class CourseController {

  @Autowired
  private CourseService courseService;

  @GetMapping("/")
  public String hello() {
    return "Hello world";
  }

  @PostMapping("/")
  public CoursePayload createCourse(
      @AuthenticationPrincipal UserPrincipal principal,
      @RequestBody CourseRequest request) {
    CoursePayload createdCourse = courseService.createCourse(principal.getUserId(), request);
    return createdCourse;
  }

  @GetMapping("/byUserId")
  public CourseQueryPayload getCoursesForUser(@AuthenticationPrincipal UserPrincipal principal) {
    CourseQueryPayload courses = courseService.getCoursesForUser(principal.getUserId());
    return courses;
  }

  @GetMapping("/{id}")
  public CoursePayload getCourseById(@PathVariable Long id) {
    CoursePayload course = courseService.getCourseById(id);
    return course;
  }

  @PatchMapping("/{id}")
  public CoursePayload updateCourseById(@PathVariable Long id, @RequestBody CourseRequest request) {
    return courseService.updateCourse(id, request);
  }

  @PatchMapping("/markCompleted/{id}")
  public CoursePayload markCourseCompleted(@PathVariable Long id) {
    return courseService.markCourseCompleted(id);
  }

  @PatchMapping("/markUncompleted/{id}")
  public CoursePayload markCourseUncompleted(@PathVariable Long id) {
    return courseService.markCourseUncompleted(id);
  }

  @DeleteMapping("/{id}")
  public void deleteCourseById(@PathVariable Long id) {
    courseService.deleteCourseById(id);
  }

}
