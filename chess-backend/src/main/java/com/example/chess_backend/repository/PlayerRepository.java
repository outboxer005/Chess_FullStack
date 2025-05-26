package com.example.chess_backend.repository;

import com.example.chess_backend.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findByUserId(String userId);
    Optional<Player> findByEmail(String email);
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
} 