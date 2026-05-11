package com.backend.backend.Repository;

import com.backend.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Agar login ke liye email se search karna hai toh ye line add karein:
    Optional<User> findByEmail(String email);
}
