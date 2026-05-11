package com.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data // Agar Lombok install hai, varna Getters/Setters manually banayein
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    @Column(name ="reset_token")
    private String resetToken;

    @Column(name ="token_expiry")
    private LocalDateTime tokenExpiry;

    @Column(nullable = false)
    private String password;

    private String role ; // Default role
}