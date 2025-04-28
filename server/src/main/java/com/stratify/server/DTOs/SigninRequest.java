package com.stratify.server.DTOs;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SigninRequest {
  private String email;
  private String password;
}
