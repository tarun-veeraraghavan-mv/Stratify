package com.stratify.server.payload;

import java.util.List;

import com.stratify.server.models.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPayload {
  private List<String> userErrors;
  private User user;
}
