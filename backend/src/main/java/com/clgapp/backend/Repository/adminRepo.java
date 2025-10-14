package com.clgapp.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Admin;

@Repository
public interface adminRepo extends JpaRepository<Admin, Long> {
    
}
