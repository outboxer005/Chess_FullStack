package com.example.chess_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @Column(nullable = false)
    private String moves;

    @Column(nullable = false)
    private String result;

    @Column(nullable = false)
    private LocalDateTime playedAt;

    @Column
    private Integer ratingChange;

    @Column(nullable = false)
    private String userColor = "WHITE";

    public Game() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Player getPlayer() { return player; }
    public void setPlayer(Player player) { this.player = player; }

    public String getMoves() { return moves; }
    public void setMoves(String moves) { this.moves = moves; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public LocalDateTime getPlayedAt() { return playedAt; }
    public void setPlayedAt(LocalDateTime playedAt) { this.playedAt = playedAt; }

    public Integer getRatingChange() { return ratingChange; }
    public void setRatingChange(Integer ratingChange) { this.ratingChange = ratingChange; }

    public String getUserColor() { return userColor; }
    public void setUserColor(String userColor) { this.userColor = userColor; }

    @PrePersist
    protected void onCreate() {
        playedAt = LocalDateTime.now();
    }

    public static Game createPredefinedGame(Player player) {
        Game game = new Game();
        game.setPlayer(player);
        game.setMoves("e4 e5 Nf3 Nc6");
        game.setResult("WIN");
        game.setUserColor("WHITE");
        game.setRatingChange(10);
        return game;
    }
} 