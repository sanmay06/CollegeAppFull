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
import org.springframework.web.bind.annotation.RequestParam;





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
    
    @PostMapping("/register")
    public String register(@RequestBody Users user) {
        return userService.register(user);
    }
    

    @PostMapping("/user/create/student")
    public String createStudent(@RequestBody Map<String, String> m) {
        return userService.createStudent(m);
    }

    @PostMapping("/user/create/employee")
    public String createEmployee(@RequestBody Map<String, String> m) {
        return userService.createEmployee(m);
    }

    @GetMapping("user/student")
    public returnUser getAllStudents() {
        return userService.getStudents();
    }

    @GetMapping("user/employee")
    public returnUser getAllEmployees() {
        return userService.getEmployees();
    }

    @PutMapping("user/student/update")
    public String updatestudent(@RequestBody List<Map<String, String>> list) {
        return userService.UpdateStudents(list);
    }

    @PutMapping("user/employee/update")
    public String updateEmployee(@RequestBody List<Map<String, String>> list) {
        return userService.UpdateEmployees(list);
    }



}
