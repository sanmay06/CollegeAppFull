package com.clgapp.backend.Model;
import com.clgapp.backend.Model.Employee;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Attendance {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(nullable = false)
    private Date date;

    @ManyToOne(optional = false)
    private Subjects subject;

    @ManyToOne(optional = false)
    private Student student;

    @ManyToOne(optional = false)
    private Employee employee;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String section;
}
