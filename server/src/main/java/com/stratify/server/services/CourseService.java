package com.stratify.server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.stratify.server.DTOs.CourseRequest;
import com.stratify.server.models.Course;
import com.stratify.server.payload.CoursePayload;
import com.stratify.server.payload.CourseQueryPayload;
import com.stratify.server.repository.CourseRepository;

@Service
public class CourseService {

  @Autowired
  private CourseRepository repository;

  public CoursePayload createCourse(Long userId, CourseRequest request) {
    Course course = new Course();

    course.setSemesterNumber(request.getSemesterNumber());
    course.setName(request.getName());
    course.setProffessorName(request.getProffessorName());
    course.setDescription(request.getDescription());
    course.setStartDate(request.getStartDate());
    course.setEndDate(request.getEndDate());
    course.setStartTime(request.getStartTime());
    course.setEndTime(request.getEndTime());
    course.setProgress(request.getProgress());
    course.setGrade(request.getGrade());
    course.setDifficulty(request.getDifficulty());
    course.setSemesterColor(request.getSemesterColor());
    course.setUserId(userId);

    List<String> courseErrors = new ArrayList<>();
    Course createdCourse = repository.save(course);

    return new CoursePayload(courseErrors, createdCourse);
  }

  public CourseQueryPayload getCoursesForUser(Long userId) {
    List<String> courseErrors = new ArrayList<>();

    return new CourseQueryPayload(courseErrors, repository.findByUserId(userId));
  }

  public CoursePayload getCourseById(Long courseId) {
    List<String> courseErrors = new ArrayList<>();

    Course course = repository.findById(courseId)
        .orElseThrow(() -> new RuntimeException("No course with id " + courseId));

    return new CoursePayload(courseErrors,
        course);
  }

  public CoursePayload updateCourse(Long courseId, CourseRequest request) {
    List<String> courseErrors = new ArrayList<>();

    Course course = repository.findById(courseId)
        .orElseThrow(() -> new RuntimeException("Course not found with id " + courseId));

    if (request.getSemesterNumber() != null)
      course.setSemesterNumber(request.getSemesterNumber());
    if (request.getName() != null)
      course.setName(request.getName());
    if (request.getProffessorName() != null)
      course.setProffessorName(request.getProffessorName());
    if (request.getDescription() != null)
      course.setDescription(request.getDescription());
    if (request.getStartDate() != null)
      course.setStartDate(request.getStartDate());
    if (request.getEndDate() != null)
      course.setEndDate(request.getEndDate());
    if (request.getStartTime() != null)
      course.setStartTime(request.getStartTime());
    if (request.getEndTime() != null)
      course.setEndTime(request.getEndTime());
    if (request.getProgress() != null)
      course.setProgress(request.getProgress());
    if (request.getGrade() != null)
      course.setGrade(request.getGrade());
    if (request.getDifficulty() != null)
      course.setDifficulty(request.getDifficulty());
    if (request.getSemesterColor() != null)
      course.setSemesterColor(request.getSemesterColor());

    Course updated = repository.save(course);

    return new CoursePayload(courseErrors, updated);

  }

  public CoursePayload markCourseCompleted(Long courseId) {
    List<String> courseErrors = new ArrayList<>();

    Course course = repository.findById(courseId).orElseThrow(() -> new RuntimeException());

    course.setProgress("Completed");

    Course updated = repository.save(course);

    return new CoursePayload(courseErrors, updated);
  }

  public CoursePayload markCourseUncompleted(Long courseId) {
    List<String> courseErrors = new ArrayList<>();

    Course course = repository.findById(courseId).orElseThrow(() -> new RuntimeException());

    course.setProgress("In Progress");

    Course updated = repository.save(course);

    return new CoursePayload(courseErrors, updated);
  }

  public void deleteCourseById(Long courseId) {
    repository.deleteById(courseId);
  }

}
