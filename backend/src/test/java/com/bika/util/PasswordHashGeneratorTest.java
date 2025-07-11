package com.bika.util;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGeneratorTest {
    
    @Test
    public void generatePasswordHashes() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        String adminPassword = "admin123";
        String superAdminPassword = "superadmin123";
        
        String adminHash = encoder.encode(adminPassword);
        String superAdminHash = encoder.encode(superAdminPassword);
        
        System.out.println("=== BCrypt Password Hashes ===");
        System.out.println("Admin password: " + adminPassword);
        System.out.println("Admin hash: " + adminHash);
        System.out.println();
        System.out.println("SuperAdmin password: " + superAdminPassword);
        System.out.println("SuperAdmin hash: " + superAdminHash);
        
        // Verify the hashes
        System.out.println();
        System.out.println("=== Verification ===");
        System.out.println("Admin hash verification: " + encoder.matches(adminPassword, adminHash));
        System.out.println("SuperAdmin hash verification: " + encoder.matches(superAdminPassword, superAdminHash));
        
        // Test with the old hashes to see if they work
        System.out.println();
        System.out.println("=== Testing Old Hashes ===");
        String oldAdminHash = "$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG";
        String oldSuperAdminHash = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi";
        
        System.out.println("Old admin hash verification: " + encoder.matches(adminPassword, oldAdminHash));
        System.out.println("Old superadmin hash verification: " + encoder.matches(superAdminPassword, oldSuperAdminHash));
    }
} 