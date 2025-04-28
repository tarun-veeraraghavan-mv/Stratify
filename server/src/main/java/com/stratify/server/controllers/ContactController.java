package com.stratify.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stratify.server.DTOs.ContactRequest;
import com.stratify.server.payload.ContactPayload;
import com.stratify.server.payload.ContactQueryPayload;
import com.stratify.server.security.UserPrincipal;
import com.stratify.server.services.ContactService;

@RestController()
@RequestMapping("/contacts")
public class ContactController {

  @Autowired
  private ContactService service;

  @PostMapping("/")
  public ContactPayload createContact(@AuthenticationPrincipal UserPrincipal principal,
      @RequestBody ContactRequest request) {
    return service.createContact(principal.getUserId(), request);
  }

  @GetMapping("/byUserId")
  public ContactQueryPayload getContactForUser(@AuthenticationPrincipal UserPrincipal principal) {
    return service.getCourseForUser(principal.getUserId());
  }

  @GetMapping("/{id}")
  public ContactPayload getContactById(@PathVariable Long id) {
    return service.getCourseById(id);
  }

  @PatchMapping("/{id}")
  public ContactPayload updateContactById(@PathVariable Long id, @RequestBody ContactRequest request) {
    return service.updateCourseById(id, request);
  }

  @DeleteMapping("/{id}")
  public void deleteContactById(@PathVariable Long id) {
    service.deleteCourseById(id);
  }

}
