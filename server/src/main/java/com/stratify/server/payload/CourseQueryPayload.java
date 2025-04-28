package com.stratify.server.payload;

import java.util.List;

import com.stratify.server.models.Course;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseQueryPayload {
  private List<String> courseErrors;
  private List<Course> course;
}
