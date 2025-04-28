package com.stratify.server.payload;

import java.util.List;
import com.stratify.server.models.Todo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoPayload {
  private List<String> todoErrors;
  private Todo todo;
}
