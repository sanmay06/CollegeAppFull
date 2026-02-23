package com.clgapp.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Employee;

@Repository
public interface employeeRepo extends JpaRepository<Employee, Long> {
    
}
