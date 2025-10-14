package com.clgapp.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Roles;

@Repository
public interface rolesRepo extends JpaRepository<Roles, String> {
    
    // Additional query methods can be defined here if needed
    
}
