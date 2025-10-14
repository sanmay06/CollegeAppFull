package com.clgapp.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clgapp.backend.Model.Fees;

@Repository
public interface FeesRepo extends JpaRepository<Fees, Long> {

    @Query(
        "SELECT f FROM Fees f WHERE f.branch.BranchName = :name"
    )
    List<Fees> findByBranch(@Param("name") String name);

}
