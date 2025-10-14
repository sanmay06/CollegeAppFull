package com.clgapp.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Subjects;
import com.clgapp.backend.Model.subjectId;

@Repository
public interface subjectsRepo extends JpaRepository<Subjects, subjectId>{

    @Query(
        "SELECT s FROM Subjects s WHERE s.subjectid.code = :code"
    )
    List<Subjects> findByCode(@Param("code") String subjCode);
    
}
