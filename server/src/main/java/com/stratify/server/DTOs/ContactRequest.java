package com.stratify.server.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequest {
  private String name;
  private String role;
  private String email;
  private String phone;
  private String birthDate;
}
