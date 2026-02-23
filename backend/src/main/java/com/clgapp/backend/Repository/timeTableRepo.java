package com.clgapp.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.TimeTable;

import jakarta.transaction.Transactional;

@Repository
public interface timeTableRepo extends JpaRepository<TimeTable, Integer> {

    @Query(
        "SELECT t FROM TimeTable t WHERE t.section = :sec AND t.semester = :sem AND t.branch.BranchName = :branch"
    )
    List<TimeTable> findAllBySemesterAndSection(
        @Param("sec") String section, 
        @Param("sem") String sem, 
        @Param("branch") String branch
    );

    @Query(
        "SELECT t FROM TimeTable t WHERE t.employee.name = :name AND t.branch = :branch"
    )
    List<TimeTable> findAllByEmployeeAndBranch(
        @Param("name") String name, 
        @Param("branch") String branch
    );

    @Modifying
    @Transactional
    @Query(
        "DELETE FROM TimeTable t WHERE t.section = :sec AND t.semester = :sem AND t.branch.BranchName = :branch"
    )
    void deleteAllSemAndSec(
        @Param("sem") String sem, 
        @Param("sec") String sec, 
        @Param("branch") String branch
    );
}
