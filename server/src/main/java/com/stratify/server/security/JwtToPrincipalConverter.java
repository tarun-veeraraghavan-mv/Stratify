package com.stratify.server.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtToPrincipalConverter {

  public UserPrincipal convert(DecodedJWT jwt) {
    System.out.println("Decoded JWT: " + jwt);
    System.out.println("UserId: " + jwt.getSubject());
    System.out.println("Email: " + jwt.getClaim("e").asString());
    System.out.println("Roles: " + jwt.getClaim("r").asList(String.class));

    UserPrincipal principal = UserPrincipal.builder()
        .userId(Long.valueOf(jwt.getSubject()))
        .email(jwt.getClaim("e").asString())
        .authorities(extractAuthoritiesFromClaim(jwt))
        .build();

    System.out.println("👉 BUILT PRINCIPAL: " + principal); // <--- ADD THIS LINE
    return principal;
  }

  private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt) {
    var claim = jwt.getClaim("r");
    if (claim.isNull() || claim.isMissing()) {
      return List.of();
    }

    List<String> roles = claim.asList(String.class); // ✅ first get strings
    return roles.stream()
        .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // prefix is optional based on your app
        .toList();
  }

}
