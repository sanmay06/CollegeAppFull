package com.clgapp.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clgapp.backend.Model.Attendance;
import com.clgapp.backend.service.attendanceService;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired attendanceService service;

    @GetMapping("/students")
    public List<com.clgapp.backend.Model.Student> getStudents(@RequestParam String semester, @RequestParam String section) {
        return service.getStudents(semester, section);
    }

    @GetMapping
    public List<Attendance> getAttendance(@RequestParam String semester, @RequestParam String section, @RequestParam String subject) {
        return service.getAttendance(subject, semester, section);
    }

    @org.springframework.web.bind.annotation.PostMapping("/bulk")
    public List<Attendance> saveAttendance(@org.springframework.web.bind.annotation.RequestBody List<Attendance> attendanceList) {
        return service.saveAll(attendanceList);
    }
    
}   