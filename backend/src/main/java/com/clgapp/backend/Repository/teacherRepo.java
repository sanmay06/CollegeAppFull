package com.clgapp.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Teacher;

@Repository
public interface teacherRepo extends JpaRepository<Teacher, Long> {
    
}
