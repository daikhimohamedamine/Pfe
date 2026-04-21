package com.medical.controller;

import com.medical.dto.UserDto;
import com.medical.entity.User;
import com.medical.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.findAll().stream()
                .map(u -> new UserDto(u.getId(), u.getUserName(), u.getRole(), u.isEnabled()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(u -> ResponseEntity.ok(new UserDto(u.getId(), u.getUserName(), u.getRole(), u.isEnabled())))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userService.existsByUserName(user.getUserName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already exists");
        }
        User saved = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new UserDto(saved.getId(), saved.getUserName(), saved.getRole(), saved.isEnabled()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            User updated = userService.update(id, user);
            return ResponseEntity.ok(new UserDto(updated.getId(), updated.getUserName(), updated.getRole(), updated.isEnabled()));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
