package com.clgapp.backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Branches;

@Repository
public interface BranchRepo extends JpaRepository<Branches, String> {
    
}
