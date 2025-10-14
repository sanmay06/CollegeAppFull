package com.clgapp.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Branches {

    @Id
    private String BranchName;

    @Column(nullable = false)
    private String BranchDesc; 
    
}
