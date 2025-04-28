package com.stratify.server.security;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtDecoder jwtDecoder;
  private final JwtToPrincipalConverter jwtToPrincipalConverter;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain)
      throws ServletException, IOException {

    extractTokenFromRequest(request)
        .map(jwtDecoder::decode)
        .map(jwtToPrincipalConverter::convert)
        .map(UserPrincipalAuthToken::new)
        .ifPresent(authentication -> {
          authentication.setAuthenticated(true);
          SecurityContextHolder.getContext().setAuthentication(authentication);
        });

    filterChain.doFilter(request, response);
  }

  private Optional<String> extractTokenFromRequest(HttpServletRequest request) {
    String token = request.getHeader("Authorization");

    if (StringUtils.isNotEmpty(token) && token.startsWith("Bearer ")) {
      return Optional.of(token.substring(7));
    }

    return Optional.empty();
  }

}
