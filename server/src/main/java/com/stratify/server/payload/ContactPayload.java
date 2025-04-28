package com.stratify.server.payload;

import java.util.List;

import com.stratify.server.models.Contact;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContactPayload {
  private List<String> contactErrors;
  private Contact contact;
}
