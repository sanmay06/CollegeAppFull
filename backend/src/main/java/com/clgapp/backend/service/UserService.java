package com.clgapp.backend.service;

import org.springframework.stereotype.Service;

import com.clgapp.backend.Model.RoleEnum;
import com.clgapp.backend.Model.Student;
import com.clgapp.backend.Model.Employee;
import com.clgapp.backend.Model.Users;
import com.clgapp.backend.Model.returnUser;
import com.clgapp.backend.Model.user;
import com.clgapp.backend.Repository.userRepo;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.clgapp.backend.Repository.studentRepo;
import com.clgapp.backend.Repository.employeeRepo;

@Service
public class UserService {

    @Autowired
    private jwtService jwtService;

    @Autowired
    private userRepo repo;

    @Autowired
    private studentRepo studentRepo;

    @Autowired
    private employeeRepo employeeRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private AuthenticationManager authManager;

    public Map<String, String> Login(Users login) {
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsn(), login.getPassword()));
        Map<String, String> m = new HashMap<>();
        if (auth.isAuthenticated()) {
            m.put("msg", "Login successful");
            Users u = repo.findById(login.getUsn()).orElse(null);
            m.put("role", u.getRole());
            m.put("token", jwtService.generateToken(login.getUsn()));
        } else {
            m.put("msg", "Login failed");
        }  
        return m;
    }

    public String register(Users user) {
        
        user.setPassword(encoder.encode(user.getPassword()));

        try {
            repo.save(user);
        } catch (Exception e) {
            return "Error Occured: " + e;
        }
        return "sucess";
    }

    public String createStudent(Map<String, String> m) {
        Users user = repo.findById(m.get("usn")).orElse(new Users());
        user.setUsn(m.get("usn"));
        user.setRole(RoleEnum.STUDENT);
        user.setEmail(m.get("email"));
        user.setPassword(encoder.encode(m.get("password")));
        user.setPhone(m.get("phone"));

        Student student;
        if (m.containsKey("id") && m.get("id") != null && !m.get("id").isEmpty())
            student = studentRepo.findById(Long.parseLong(m.get("id"))).orElse(new Student());
        else
            student = new Student();

        student.setQuotaName(m.get("quota"));
        student.setName(m.get("name")); 
        student.setAge(Integer.parseInt(m.get("age")));
        student.setDob(Date.valueOf(LocalDate.parse(m.get("dob"), DateTimeFormatter.ISO_DATE)));
        student.setCgpa(Float.parseFloat(m.get("cgpa")));
        student.setJoinDate(Date.valueOf(LocalDate.parse(m.get("joinDate"), DateTimeFormatter.ISO_DATE)));
        student.setSemester(Integer.parseInt(m.get("semester")));
        student.setYear(Integer.parseInt(m.get("year")));
        student.setBacklogs(Integer.parseInt(m.get("backlogs")));
        student.setSection(m.get("section"));
        student.setUser(user);

        try {
            repo.save(user);
            studentRepo.save(student);
        } catch (Exception e) {
            return "Error creating student: " + e.getMessage();
        }

        return "Done";
    }

    public String createEmployee(Map<String, String> m) {
        Users user = repo.findById(m.get("usn")).orElse(new Users());
        user.setUsn(m.get("usn"));
        user.setRole(RoleEnum.EMPLOYEE);
        user.setEmail(m.get("email"));
        user.setPassword(encoder.encode(m.get("password")));
        user.setPhone(m.get("phone"));

        Employee emp;
        if (m.containsKey("id") && m.get("id") != null && !m.get("id").isEmpty()) 
            emp = employeeRepo.findById(Long.parseLong(m.get("id"))).orElse(new Employee());
        else  
            emp = new Employee();

        emp.setName(m.get("name"));
        emp.setAge(Integer.parseInt(m.get("age")));
        emp.setDob(Date.valueOf(LocalDate.parse(m.get("dob"), DateTimeFormatter.ISO_DATE)));
        emp.setJoinDate(Date.valueOf(LocalDate.parse(m.get("joinDate"), DateTimeFormatter.ISO_DATE)));
        emp.setSalary(new BigInteger(m.get("salary")));
        emp.setUser(user);

        try {
            repo.save(user);
            employeeRepo.save(emp);
        } catch (Exception e) {
            return "Error creating employee: " + e.getMessage();
        }
        return "Done";
    }

    public returnUser getStudents() {
        List<Student> list = studentRepo.findAll();
    
        List<String> head = Arrays.asList(
            "USN", "Name", "Email", "Phone", "Branch", "Age", "Year", "Section", "CGPA", 
            "Semester", "Backlogs", "Proctor", "Quota", "Fees Status"
        );
    
        List<String> keys = Arrays.asList(
            "USN", "Name", "Email", "Phone", "Branch", "Age", "Year", "Section", "CGPA", 
            "Semester", "Backlogs", "Proctor", "Quota", "FeesStatus"
        );
    
        List<user> l = new ArrayList<>();
        for (Student stud : list) {
            user u = new user(
                stud.getUser().getUsn(),
                stud.getUser().getEmail(),
                stud.getUser().getPhone(),
                stud.getBranch().getBranchName(),
                stud.getId(),
                stud.getName(),
                stud.getAge(),
                stud.getDob(),
                stud.getJoinDate(),
                null,
                stud.getSection(),
                stud.getCgpa(),
                stud.getYear(),
                stud.getSemester(),
                stud.getBacklogs(),
                stud.getQuotaName(),
                stud.isFeesStatus(),
                stud.getProctor() != null ? stud.getProctor().getName() : ""
            );
            l.add(u);
        }
        return new returnUser(head, keys, l);
    }
    
    public returnUser getEmployees() {
        List<Employee> list = employeeRepo.findAll();
    
        List<String> head = Arrays.asList(
            "USN", "Email", "Phone", "Branch", "Name", "Age", 
            "DOB", "Join Date", "Salary"
        );
    
        List<String> keys = Arrays.asList(
            "usn", "email", "phone", "branch", "name", "age", 
            "dob", "joinDate", "salary"
        );
    
        List<user> l = new ArrayList<>();
        for (Employee us : list) {
            user u = new user(
                us.getUser().getUsn(),
                us.getUser().getEmail(),
                us.getUser().getPhone(),
                us.getBranch().getBranchName(),
                us.getId(),
                us.getName(),
                us.getAge(),
                us.getDob(),
                us.getJoinDate(),
                us.getSalary(),
                null,
                0.0f,
                0,
                0,
                0,
                null,
                false,
                null
            );
            l.add(u);
        }
        return new returnUser(head, keys, l);
    }

    public String UpdateEmployees(List<Map<String, String>> list) {
        try {
            for (Map<String, String> m : list) {
                Employee employee = employeeRepo.findById(Long.parseLong(m.get("id"))).orElse(null);
                if (employee == null) continue;
    
                Users user = employee.getUser();
                user.setEmail(m.get("email"));
                user.setPhone(m.get("phone"));
    
                employee.setName(m.get("name"));
                employee.setAge(Integer.parseInt(m.get("age")));
                employee.setDob(Date.valueOf(LocalDate.parse(m.get("dob"), DateTimeFormatter.ISO_DATE)));
                employee.setJoinDate(Date.valueOf(LocalDate.parse(m.get("joinDate"), DateTimeFormatter.ISO_DATE)));
                employee.setSalary(new BigInteger(m.get("salary")));
    
                repo.save(user);
                employeeRepo.save(employee);
            }
        } catch (Exception e) {
            return "Error updating employees: " + e.getMessage();
        }
        return "Done";
    }
    
    public String UpdateStudents(List<Map<String, String>> list) {
        try {
            for (Map<String, String> m : list) {
                Student student = studentRepo.findById(Long.parseLong(m.get("id"))).orElse(null);
                if (student == null) continue;
    
                Users user = student.getUser();
                user.setEmail(m.get("email"));
                user.setPhone(m.get("phone"));
    
                student.setName(m.get("name"));
                student.setAge(Integer.parseInt(m.get("age")));
                student.setDob(Date.valueOf(LocalDate.parse(m.get("dob"), DateTimeFormatter.ISO_DATE)));
                student.setJoinDate(Date.valueOf(LocalDate.parse(m.get("joinDate"), DateTimeFormatter.ISO_DATE)));
                student.setCgpa(Float.parseFloat(m.get("cgpa")));
                student.setYear(Integer.parseInt(m.get("year")));
                student.setSemester(Integer.parseInt(m.get("semester")));
                student.setBacklogs(Integer.parseInt(m.get("backlogs")));
                student.setSection(m.get("section"));
                student.setFeesStatus(Boolean.parseBoolean(m.get("feesStatus")));
                // TODO: update proctor and quota if needed
    
                repo.save(user);
                studentRepo.save(student);
            }
        } catch (Exception e) {
            return "Error updating students: " + e.getMessage();
        }
        return "Done";
    }
    
}
