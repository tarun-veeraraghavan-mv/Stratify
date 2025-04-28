package com.stratify.server.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stratify.server.DTOs.LoginRequest;
import com.stratify.server.DTOs.LoginResponse;
import com.stratify.server.DTOs.SigninRequest;
import com.stratify.server.models.User;
import com.stratify.server.payload.UserPayload;
import com.stratify.server.security.JwtIssuer;
import com.stratify.server.security.UserPrincipal;
import com.stratify.server.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final JwtIssuer jwtIssuer;
  private final UserService userService;

  @PostMapping("/register")
  public LoginResponse register(@RequestBody @Validated SigninRequest request) {
    User user = userService.createUser(
        request.getEmail(),
        request.getPassword(),
        List.of("USER"));

    String token = jwtIssuer.issue(user.getId(), user.getEmail(), user.getRoles());

    return LoginResponse.builder()
        .accessToken(token)
        .build();
  }

  @PostMapping("/login")
  public LoginResponse login(@RequestBody @Validated LoginRequest request) {
    User user = userService.findByEmail(request.getEmail());

    var token = jwtIssuer.issue(user.getId(), request.getEmail(), user.getRoles());

    return LoginResponse.builder()
        .accessToken(token)
        .build();
  }

  @GetMapping("/me")
  public UserPayload findCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
    User foundUser = userService.findByUserId(principal.getUserId());

    if (foundUser == null) {
      List<String> userErrors = new ArrayList<>();
      userErrors.add("This user does not exist!");
      UserPayload userPayload = new UserPayload(userErrors, null);
      return userPayload;
    }

    List<String> userErrors = new ArrayList<>();
    UserPayload userPayload = new UserPayload(userErrors, foundUser);

    return userPayload;

  }

}
