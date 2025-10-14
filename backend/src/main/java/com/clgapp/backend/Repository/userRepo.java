package com.clgapp.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.clgapp.backend.Model.Users;

@Repository
public interface userRepo extends JpaRepository<Users, String> {

}
