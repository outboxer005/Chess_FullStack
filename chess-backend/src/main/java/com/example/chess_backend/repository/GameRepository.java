package com.example.chess_backend.repository;

import com.example.chess_backend.model.Game;
import com.example.chess_backend.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByPlayerOrderByPlayedAtDesc(Player player);
    List<Game> findTop10ByPlayerOrderByPlayedAtDesc(Player player);
} 