package com.clgapp.backend.Model;

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

    private String day;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "subject_code", referencedColumnName = "code"),
        @JoinColumn(name = "subject_type", referencedColumnName = "type")
    })
    private Subjects subject;

    private String st;

    private String et;

    private String section;

    private String semester;

    @ManyToOne()
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "branchname")
    private Branches branch;

}
