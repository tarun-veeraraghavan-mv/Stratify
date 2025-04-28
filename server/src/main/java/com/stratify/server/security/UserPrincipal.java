package com.stratify.server.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserPrincipal implements UserDetails {

  private final Long userId;
  private final String email;
  private final Collection<? extends GrantedAuthority> authorities;

  public UserPrincipal() {
    this.userId = null;
    this.email = null;
    this.authorities = null;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return null;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public String toString() {
    return "UserPrincipal{" +
        "userId=" + userId +
        ", email='" + email + '\'' +
        ", authorities=" + authorities +
        '}';
  }

}
