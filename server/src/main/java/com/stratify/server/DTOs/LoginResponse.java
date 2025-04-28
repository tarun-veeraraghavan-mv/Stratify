package com.stratify.server.DTOs;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
  private String accessToken;
}
