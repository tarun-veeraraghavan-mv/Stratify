package com.stratify.server.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoRequest {
  private String name;
  private String dueDate;
  private String progress;
  private String priority;
  private String remarks;
}
