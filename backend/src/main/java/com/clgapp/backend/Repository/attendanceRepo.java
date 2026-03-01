package com.clgapp.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Attendance;

@Repository
public interface attendanceRepo extends JpaRepository<Attendance, Long> {

    @Query("SELECT a FROM Attendance a WHERE a.student.semester = :semester AND a.section = :section AND a.subject.subjectName = :subject")
    List<Attendance> findBySemesterAndSectionAndSubject(@Param("semester") int semester, @Param("section") String section, @Param("subject") String subject);

}
