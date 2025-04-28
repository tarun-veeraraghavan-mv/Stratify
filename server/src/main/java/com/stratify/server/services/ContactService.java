package com.stratify.server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stratify.server.DTOs.ContactRequest;
import com.stratify.server.models.Contact;
import com.stratify.server.payload.ContactPayload;
import com.stratify.server.payload.ContactQueryPayload;
import com.stratify.server.repository.ContactRepository;

@Service
public class ContactService {

  @Autowired
  private ContactRepository repository;

  public ContactPayload createContact(Long userId, ContactRequest request) {

    List<String> contactErrors = new ArrayList<>();
    Contact contact = new Contact();

    contact.setName(request.getName());
    contact.setRole(request.getRole());
    contact.setPhone(request.getPhone());
    contact.setEmail(request.getEmail());
    contact.setPhone(request.getPhone());
    contact.setBirthDate(request.getBirthDate());

    contact.setUserId(userId);

    Contact createdContact = repository.save(contact);

    return new ContactPayload(contactErrors, createdContact);

  }

  public ContactQueryPayload getCourseForUser(Long userId) {
    List<String> contactErrors = new ArrayList<>();

    List<Contact> contacts = repository.findByUserId(userId);

    return new ContactQueryPayload(contactErrors, contacts);
  }

  public ContactPayload getCourseById(Long courseId) {
    List<String> contactErrors = new ArrayList<>();

    Contact contact = repository.findById(courseId)
        .orElseThrow(() -> new RuntimeException("This course does not exist"));

    return new ContactPayload(contactErrors, contact);
  }

  public ContactPayload updateCourseById(Long courseId, ContactRequest request) {
    List<String> contactErrors = new ArrayList<>();

    Contact contact = repository.findById(courseId)
        .orElseThrow(() -> new RuntimeException("Could not find course with id"));

    if (request.getName() != null) {
      contact.setName(request.getName());
    }
    if (request.getRole() != null) {
      contact.setRole(request.getRole());
    }
    if (request.getEmail() != null) {
      contact.setEmail(request.getEmail());
    }
    if (request.getPhone() != null) {
      contact.setPhone(request.getPhone());
    }
    if (request.getBirthDate() != null) {
      contact.setBirthDate(request.getBirthDate());
    }

    Contact updated = repository.save(contact);

    return new ContactPayload(contactErrors, updated);
  }

  public void deleteCourseById(Long contactId) {
    repository.deleteById(contactId);
  }

}
