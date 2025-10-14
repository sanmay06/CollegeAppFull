package com.clgapp.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.clgapp.backend.Model.Role;

import java.util.List;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {

    @Query(
        "SELECT r.privilage.roleName from Role r where r.user.usn = :usn"          
    )
    List<Role> findByUSN(@Param("usn") String USN);
    
}