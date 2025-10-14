package com.clgapp.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Quota;

@Repository
public interface QuotaRepo extends JpaRepository<Quota, String>{

    @Query("SELECT name FROM Quota")
    List<String> findAllIds();
    
}
