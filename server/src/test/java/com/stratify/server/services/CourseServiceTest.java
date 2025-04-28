package com.stratify.server.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.stratify.server.models.Course;
import com.stratify.server.payload.CourseQueryPayload;
import com.stratify.server.repository.CourseRepository;

@ExtendWith(SpringExtension.class)
public class CourseServiceTest {

  @InjectMocks
  private CourseService courseService;

  @Mock
  private CourseRepository repository;

  @Test
  public void testGetCoursesForUser() {
    // Given
    Long userId = 1L;
    List<Course> expectedCourses = Arrays.asList(
        new Course(1L, 1, "Java Programming", "Dr. Smith", "Introduction to Java",
            "2025-01-15", "2025-05-15", "10:00", "11:30", "In Progress",
            85, "Intermediate", "Blue", userId),
        new Course(2L, 2, "Spring Boot", "Prof. Johnson", "Advanced Spring Boot",
            "2025-01-15", "2025-05-15", "13:00", "14:30", "Not Started",
            0, "Advanced", "Green", userId));

    // When
    when(repository.findByUserId(userId)).thenReturn(expectedCourses);

    // Then
    CourseQueryPayload result = courseService.getCoursesForUser(userId);

    assertNotNull(result);
    assertEquals(expectedCourses.size(), result.getCourse().size());
    assertEquals(0, result.getCourseErrors().size());
  }
}