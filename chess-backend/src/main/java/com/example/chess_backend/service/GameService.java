package com.example.chess_backend.service;

import com.example.chess_backend.dto.GameDTO;
import com.example.chess_backend.model.Game;
import com.example.chess_backend.model.Player;
import com.example.chess_backend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PlayerService playerService;

    @Transactional
    public Game saveGame(String userId, GameDTO gameDTO) {
        Player player = playerService.getPlayerByUserId(userId);
        
        Game game = new Game();
        game.setPlayer(player);
        game.setMoves(gameDTO.getMoves());
        game.setResult(gameDTO.getResult());
        game.setUserColor(gameDTO.getUserColor());
        game.setRatingChange(gameDTO.getRatingChange());

        Game savedGame = gameRepository.save(game);
        
        if (gameDTO.getRatingChange() != null) {
            playerService.updatePlayerRating(userId, gameDTO.getRatingChange());
        }

        return savedGame;
    }

    public List<Game> getPlayerGames(String userId) {
        Player player = playerService.getPlayerByUserId(userId);
        return gameRepository.findByPlayerOrderByPlayedAtDesc(player);
    }

    public List<Game> getPlayerRecentGames(String userId) {
        Player player = playerService.getPlayerByUserId(userId);
        return gameRepository.findTop10ByPlayerOrderByPlayedAtDesc(player);
    }
} 