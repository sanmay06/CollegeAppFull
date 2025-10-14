package com.clgapp.backend.Model;

import java.util.Date;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;

    @OneToOne
    private Users user;

    @ManyToOne
    @JoinColumn(name = "Branch_name")
    private Branches Branch;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private Date dob;

    @Column(nullable = false)
    private float cgpa;

    @Column(nullable = false)
    private Date joinDate;

    @Column(nullable = false)
    private int semester;

    @Column(nullable = false)
    private int year;

    @Column(nullable = false)
    private int backlogs;

    @OneToOne
    @JoinColumn(name = "Quota")
    private Quota quotaName;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean feesStatus;

    @ManyToOne
    @JoinColumn(name = "teacher_name")
    private Teacher proctor;

}
