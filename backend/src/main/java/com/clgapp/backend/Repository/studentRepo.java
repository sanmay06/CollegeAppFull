package com.clgapp.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Student;

@Repository
public interface studentRepo extends JpaRepository<Student, Long> {
    
}
