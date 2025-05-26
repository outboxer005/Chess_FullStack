package com.example.chess_backend.controller;

import java.time.LocalDateTime;
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

import com.example.chess_backend.dto.PlayerDTO;
import com.example.chess_backend.model.Player;
import com.example.chess_backend.service.PlayerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerPlayer(@Valid @RequestBody PlayerDTO playerDTO) {
        try {
            Player player = playerService.registerPlayer(playerDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("userId", player.getUserId());
            response.put("email", player.getEmail());
            response.put("rating", player.getRating());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getPlayer(@PathVariable String userId) {
        try {
            Player player = playerService.getPlayerByUserId(userId);
            Map<String, Object> response = new HashMap<>();
            response.put("userId", player.getUserId());
            response.put("email", player.getEmail());
            response.put("rating", player.getRating());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Player not found");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        try {
            String userId = authentication.getName();
            Player player = playerService.getPlayerByUserId(userId);
            Map<String, Object> response = new HashMap<>();
            response.put("userId", player.getUserId());
            response.put("email", player.getEmail());
            response.put("rating", player.getRating());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @GetMapping("/online")
    public ResponseEntity<?> getOnlinePlayers() {
        LocalDateTime fiveMinutesAgo = LocalDateTime.now().minusMinutes(5);
        List<Player> onlinePlayers = playerService.getPlayersActiveSince(fiveMinutesAgo);
        List<Map<String, Object>> result = onlinePlayers.stream().map(player -> {
            Map<String, Object> map = new HashMap<>();
            map.put("userId", player.getUserId());
            map.put("email", player.getEmail());
            map.put("rating", player.getRating());
            return map;
        }).toList();
        return ResponseEntity.ok(result);
    }
} 