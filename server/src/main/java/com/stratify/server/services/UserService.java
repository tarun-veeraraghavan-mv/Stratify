package com.stratify.server.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.stratify.server.models.User;
import com.stratify.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public User createUser(String email, String password, List<String> roles) {
    String encodedPassword = passwordEncoder.encode(password);

    User user = User.builder()
        .email(email)
        .password(encodedPassword)
        .roles(roles)
        .build();

    return userRepository.save(user);
  }

  public User findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User findByUserId(Long id) {
    return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
  }

  public boolean verifyPassword(User user, String password) {
    return passwordEncoder.matches(password, user.getPassword());
  }
}
