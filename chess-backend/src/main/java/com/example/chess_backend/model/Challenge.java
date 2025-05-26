package com.example.chess_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "challenges")
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String challengerUserId;

    @Column(nullable = false)
    private String challengedUserId;

    @Column(nullable = false)
    private String status; // PENDING, ACCEPTED, DECLINED

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Challenge() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getChallengerUserId() { return challengerUserId; }
    public void setChallengerUserId(String challengerUserId) { this.challengerUserId = challengerUserId; }

    public String getChallengedUserId() { return challengedUserId; }
    public void setChallengedUserId(String challengedUserId) { this.challengedUserId = challengedUserId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
} 