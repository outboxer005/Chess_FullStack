package com.example.chess_backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:4200")
public class TestController {

    @GetMapping("/ping")
    public String ping() {
        return "Server is running!";
    }

    @GetMapping("/echo/{message}")
    public String echo(@PathVariable String message) {
        return "Echo: " + message;
    }

    @PostMapping("/echo")
    public String echoPost(@RequestBody String message) {
        return "Echo POST: " + message;
    }
} 