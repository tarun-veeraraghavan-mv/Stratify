package com.stratify.server.DTOs;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SigninResponse {
  private Long id;
  private String email;
  private List<String> roles;
}
