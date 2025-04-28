package com.stratify.server.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseRequest {
  private Integer semesterNumber;
  private String name;
  private String proffessorName;
  private String description;
  private String startDate;
  private String endDate;
  private String startTime;
  private String endTime;
  private String progress;
  private Integer grade;
  private String difficulty;
  private String semesterColor;
  private Long userId;
}
