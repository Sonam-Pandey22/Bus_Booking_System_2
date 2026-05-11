package com.backend.backend.Repository;
import com.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PassengerRepository extends JpaRepository<User, Long> {
    // Login ke waqt email se user dhoondne ke liye
    Optional<User> findByEmail(String email);
}