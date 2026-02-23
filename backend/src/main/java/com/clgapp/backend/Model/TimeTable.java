package com.clgapp.backend.Model;
import com.clgapp.backend.Model.Employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "timetable")
public class TimeTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String day;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "subject_code", referencedColumnName = "code"),
        @JoinColumn(name = "subject_type", referencedColumnName = "type")
    })
    private Subjects subject;

    @Column(nullable = false)
    private String st;

    @Column(nullable = false)
    private String et;

    @Column(nullable = false)
    private String section;

    @Column(nullable = false)
    private String semester;

    @ManyToOne()
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "branchname")
    private Branches branch;

}
