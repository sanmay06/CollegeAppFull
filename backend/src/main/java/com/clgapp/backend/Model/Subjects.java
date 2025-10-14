package com.clgapp.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Subjects {

    @EmbeddedId
    private subjectId subjectid;

    @Column(nullable = false)
    private String subjectName;

    @Column(nullable = false)
    private String subjectCredits;
    
}
