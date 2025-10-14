package com.clgapp.backend.Model;

import java.math.BigInteger;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class user {

    private String USN;

    private String Email;

    private String Phone;
    
    private String Branch;

    private Long id;

    private String Name;

    private int Age;

    private Date dob;

    private Date JoinDate;

    private BigInteger Salary;

    private float CGPA;

    private int Year;

    private int Semester;

    private int Backlogs;

    private String Quota;

    private boolean FeesStatus;

    private String Proctor;

}
