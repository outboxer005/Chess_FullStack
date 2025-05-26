package com.example.chess_backend.service;

import com.example.chess_backend.dto.PlayerDTO;
import com.example.chess_backend.model.Player;
import com.example.chess_backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Player registerPlayer(PlayerDTO playerDTO) {
        if (playerRepository.existsByUserId(playerDTO.getUserId())) {
            throw new RuntimeException("User ID already exists");
        }
        if (playerRepository.existsByEmail(playerDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Player player = new Player();
        player.setUserId(playerDTO.getUserId());
        player.setEmail(playerDTO.getEmail());
        player.setPassword(passwordEncoder.encode(playerDTO.getPassword()));
        player.setRating(1500); // Default rating

        return playerRepository.save(player);
    }

    public Player getPlayerByUserId(String userId) {
        return playerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Player not found"));
    }

    @Transactional
    public void updatePlayerRating(String userId, int ratingChange) {
        Player player = getPlayerByUserId(userId);
        player.setRating(player.getRating() + ratingChange);
        playerRepository.save(player);
    }

    public void updatePlayerRating(Player player, String result, int opponentRating) {
        int k = 32;
        int playerRating = player.getRating();
        double expectedScore = 1.0 / (1.0 + Math.pow(10, (opponentRating - playerRating) / 400.0));
        double actualScore;
        switch (result) {
            case "WIN": actualScore = 1.0; break;
            case "DRAW": actualScore = 0.5; break;
            case "LOSS": actualScore = 0.0; break;
            default: throw new IllegalArgumentException("Invalid result: " + result);
        }
        int newRating = (int) Math.round(playerRating + k * (actualScore - expectedScore));
        player.setRating(newRating);
        playerRepository.save(player);
    }

    public List<Player> getPlayersActiveSince(LocalDateTime since) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getLastActive() != null && player.getLastActive().isAfter(since))
                .collect(Collectors.toList());
    }
} 