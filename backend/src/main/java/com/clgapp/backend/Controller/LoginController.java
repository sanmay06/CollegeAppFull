package com.clgapp.backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clgapp.backend.Model.Users;
import com.clgapp.backend.Model.returnUser;
import com.clgapp.backend.service.UserService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
// @RequestMapping("/user")
public class LoginController {

    @Autowired
    UserService userService;

    @RequestMapping("/test")
    public String testing() {
        return "Server up and running";
    }

    @PostMapping("/login")
    public Map<String, String> Login(@RequestBody Users user) {
        return userService.Login(user);
    }
    
    @PostMapping("/user/create/student")
    public String createStudent(@RequestBody Map<String, String> m) {
        return userService.createStudent(m);
    }

    @PostMapping("/user/create/teacher")
    public String createTeacher(@RequestBody Map<String, String> m) {
        return userService.createTeacher(m);
    }

    @PostMapping("/user/create/admin")
    public String createAdmin(@RequestBody Map<String, String> m) {
        return userService.createAdmin(m);
    }

    @GetMapping("user/student")
    public returnUser getAllStudents() {
        return userService.getStudents();
    }

    @GetMapping("user/teacher")
    public returnUser getAllTeachers() {
        return userService.getTeachers();
    }

    @GetMapping("user/admin")
    public returnUser getAllAdmins() {
        return userService.getAdmins();
    } 

    @PutMapping("user/student/update")
    public String updatestudent(@RequestBody List<Map<String, String>> list) {
        return userService.UpdateStudents(list);
    }

    @PutMapping("user/teacher/update")
    public String updateTeacher(@RequestBody List<Map<String, String>> list) {
        return userService.UpdateTeachers(list);
    }

    @PutMapping("user/admin/update")
    public String updateAdmin(@RequestBody List<Map<String, String>> list) {
        return userService.UpdateAdmin(list);
    }

}
