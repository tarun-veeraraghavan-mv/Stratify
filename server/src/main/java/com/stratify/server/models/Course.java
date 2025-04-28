package com.stratify.server.models;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int semesterNumber;
  private String name;
  private String proffessorName;
  private String description;
  private String startDate;
  private String endDate;
  private String startTime;
  private String endTime;
  private String progress;
  private int grade;
  private String difficulty;
  private String semesterColor;

  private Long userId;

}
