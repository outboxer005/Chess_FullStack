package com.example.chess_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chess_backend.dto.GameDTO;
import com.example.chess_backend.model.Game;
import com.example.chess_backend.model.Player;
import com.example.chess_backend.repository.PlayerRepository;
import com.example.chess_backend.service.GameService;
import com.example.chess_backend.service.PlayerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {
    @Autowired
    private GameService gameService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private PlayerRepository playerRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUserGames(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String userId = authentication.getName();
        List<Game> games = gameService.getPlayerGames(userId);
        return ResponseEntity.ok(games);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> saveGame(
            @PathVariable String userId,
            @Valid @RequestBody GameDTO gameDTO) {
        Player player = playerRepository.findByUserId(userId).orElse(null);
        if (player == null) {
            return ResponseEntity.status(404).body("Player not found");
        }
        // Assume opponentUserId is sent in GameDTO for multiplayer
        Player opponent = null;
        if (gameDTO.getOpponentUserId() != null) {
            opponent = playerRepository.findByUserId(gameDTO.getOpponentUserId()).orElse(null);
            if (opponent == null) {
                return ResponseEntity.status(404).body("Opponent not found");
            }
        }
        Game game = gameService.saveGame(userId, gameDTO);
        // Update ratings
        if (opponent != null) {
            playerService.updatePlayerRating(player, gameDTO.getResult(), opponent.getRating());
            // Invert result for opponent
            String oppResult = gameDTO.getResult().equals("WIN") ? "LOSS" : (gameDTO.getResult().equals("LOSS") ? "WIN" : "DRAW");
            playerService.updatePlayerRating(opponent, oppResult, player.getRating());
        }
        Map<String, Object> response = new HashMap<>();
        response.put("game", game);
        response.put("playerRating", player.getRating());
        if (opponent != null) response.put("opponentRating", opponent.getRating());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Game>> getPlayerGames(@PathVariable String userId) {
        List<Game> games = gameService.getPlayerGames(userId);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/{userId}/recent")
    public ResponseEntity<List<Game>> getPlayerRecentGames(@PathVariable String userId) {
        List<Game> games = gameService.getPlayerRecentGames(userId);
        return ResponseEntity.ok(games);
    }
} 