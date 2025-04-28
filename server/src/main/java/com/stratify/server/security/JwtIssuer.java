package com.stratify.server.security;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtIssuer {

  private final JwtProperties properties;

  public String issue(Long userId, String email, List<String> roles) {
    return JWT.create()
        .withSubject(String.valueOf(userId))
        .withExpiresAt(Instant.now().plus(Duration.ofDays(1)))
        .withClaim("e", email)
        .withClaim("r", roles)
        .sign(Algorithm.HMAC256(properties.getSecretKey()));
  }

}
