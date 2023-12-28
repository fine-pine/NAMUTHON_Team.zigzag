package com.zigzag.app.repository;

import com.zigzag.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByGoogleEmail(String email);
    Optional<User> findByRefreshToken(String refreshToken);
}
