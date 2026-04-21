package com.medical.service;

import com.medical.entity.User;
import com.medical.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public User save(User user) {
        if (user.getId() == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    public User update(Long id, User updatedUser) {
        return userRepository.findById(id).map(existing -> {
            existing.setUserName(updatedUser.getUserName());
            existing.setRole(updatedUser.getRole());
            existing.setEnabled(updatedUser.isEnabled());
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
                existing.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            return userRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }
}
