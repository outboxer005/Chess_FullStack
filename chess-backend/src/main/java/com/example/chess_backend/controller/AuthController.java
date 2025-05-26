package com.example.chess_backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chess_backend.dto.LoginRequest;
import com.example.chess_backend.model.Player;
import com.example.chess_backend.repository.PlayerRepository;
import com.example.chess_backend.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private PlayerRepository playerRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            logger.info("Attempting login for user: {}", loginRequest.getUserId());
            
            Optional<Player> playerOpt = playerRepository.findByUserId(loginRequest.getUserId());
            if (playerOpt.isEmpty()) {
                logger.warn("Login failed: User not found - {}", loginRequest.getUserId());
                return ResponseEntity.status(401).body("Invalid userId or password");
            }
            
            Player player = playerOpt.get();
            if (!passwordEncoder.matches(loginRequest.getPassword(), player.getPassword())) {
                logger.warn("Login failed: Invalid password for user - {}", loginRequest.getUserId());
                return ResponseEntity.status(401).body("Invalid userId or password");
            }
            
            // Generate JWT token
            String token;
            try {
                token = jwtUtil.generateToken(player.getUserId());
                logger.info("Token generated successfully for user: {}", player.getUserId());
            } catch (Exception e) {
                logger.error("Token generation failed for user: " + player.getUserId(), e);
                return ResponseEntity.status(500).body("Token generation failed: " + e.getMessage());
            }
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", player.getUserId());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Unexpected error during login", e);
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }
} 