package com.clgapp.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clgapp.backend.Model.Attendance;
import com.clgapp.backend.Repository.attendanceRepo;
import com.clgapp.backend.Repository.studentRepo;
import com.clgapp.backend.Repository.subjectsRepo;
import com.clgapp.backend.Repository.employeeRepo;

@Service
public class attendanceService {

    @Autowired
    private attendanceRepo repo;

    @Autowired
    private studentRepo sRepo;

    @Autowired
    private subjectsRepo subRepo;

    @Autowired
    private employeeRepo empRepo;
    
    public java.util.List<com.clgapp.backend.Model.Student> getStudents(String sem, String section) {
        return sRepo.findBySemesterAndSection(Integer.parseInt(sem), section);
    }
    
    public List<Attendance> getAttendance(String branch, String sem, String section) {
        return repo.findBySemesterAndSectionAndSubject(Integer.parseInt(sem), section, branch);
    }

    public List<Attendance> saveAll(List<Attendance> attendanceList) {
        for (Attendance a : attendanceList) {
            // Resolve Student
            if (a.getStudent() != null && a.getStudent().getId() != 0) {
                a.setStudent(sRepo.findById(a.getStudent().getId()).orElse(null));
            }
            // Resolve Subject
            if (a.getSubject() != null && a.getSubject().getSubjectName() != null) {
                a.setSubject(subRepo.findBySubjectName(a.getSubject().getSubjectName()).orElse(null));
            }
            // Resolve Employee
            if (a.getEmployee() != null && a.getEmployee().getId() != 0) {
                a.setEmployee(empRepo.findById(a.getEmployee().getId()).orElse(null));
            }
        }
        // Filter out records where entities couldn't be resolved
        List<Attendance> toSave = attendanceList.stream()
            .filter(a -> a.getStudent() != null && a.getSubject() != null)
            .toList();
            
        return repo.saveAll(toSave);
    }

}
