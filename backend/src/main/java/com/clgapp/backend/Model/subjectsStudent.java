package com.clgapp.backend.Model;

// import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @NoArgsConstructor
// @AllArgsConstructor
// @Data
public class subjectsStudent {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "subject_code", referencedColumnName = "code"),
        @JoinColumn(name = "subject_type", referencedColumnName = "type")
    })
    private Subjects subject;

}
