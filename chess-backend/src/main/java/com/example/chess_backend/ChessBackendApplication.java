package com.example.chess_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EntityScan("com.example.chess_backend.model")
@EnableJpaRepositories("com.example.chess_backend.repository")
public class ChessBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChessBackendApplication.class, args);
	}

	@GetMapping("/")
	public String home() {
		return "Chess Backend is running!";
	}

}
