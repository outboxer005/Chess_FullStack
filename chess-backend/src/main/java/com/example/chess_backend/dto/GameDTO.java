package com.example.chess_backend.dto;

import jakarta.validation.constraints.NotBlank;

public class GameDTO {
    @NotBlank(message = "Moves are required")
    private String moves;

    @NotBlank(message = "Game result is required")
    private String result;

    private Integer ratingChange;

    private String opponentUserId;

    private String userColor = "WHITE";

    public GameDTO() {}

    public String getMoves() { return moves; }
    public void setMoves(String moves) { this.moves = moves; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public Integer getRatingChange() { return ratingChange; }
    public void setRatingChange(Integer ratingChange) { this.ratingChange = ratingChange; }

    public String getOpponentUserId() { return opponentUserId; }
    public void setOpponentUserId(String opponentUserId) { this.opponentUserId = opponentUserId; }

    public String getUserColor() { return userColor; }
    public void setUserColor(String userColor) { this.userColor = userColor; }
} 