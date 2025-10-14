package com.clgapp.backend.service;

import org.springframework.stereotype.Service;

import com.clgapp.backend.Model.Admin;
import com.clgapp.backend.Model.Quota;
import com.clgapp.backend.Model.RoleEnum;
import com.clgapp.backend.Model.Student;
import com.clgapp.backend.Model.Teacher;
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
import com.clgapp.backend.Repository.teacherRepo;
import com.clgapp.backend.Repository.QuotaRepo;
import com.clgapp.backend.Repository.adminRepo;

@Service
public class UserService {

    @Autowired
    private jwtService jwtService;

    @Autowired
    private userRepo repo;

    @Autowired
    private QuotaRepo qrepo;

    @Autowired
    private studentRepo studentRepo;

    @Autowired
    private teacherRepo teacherRepo;

    @Autowired
    private adminRepo adminRepo;

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

    public String createStudent(Map<String, String> m) {
        Users user = repo.findById(m.get("usn")).orElse(new Users());
        user.setUsn(m.get("usn"));
        user.setRole(RoleEnum.STUDENT);
        user.setEmail(m.get("email"));
        user.setPassword(encoder.encode(m.get("password")));
        user.setPhone(m.get("phone"));

        Quota q = qrepo.findById(m.get("quota")).orElse(null);
        
        if(q == null) 
            return "Please enter the correct Quota Name";

        Student student;
        if (m.containsKey("id") && m.get("id") != null && !m.get("id").isEmpty())
            student = studentRepo.findById(Long.parseLong(m.get("id"))).orElse(new Student());
        else
            student = new Student();

        student.setQuotaName(q);
        student.setName(m.get("name")); 
        student.setAge(Integer.parseInt(m.get("age")));
        student.setDob(Date.valueOf(LocalDate.parse(m.get("dob"), DateTimeFormatter.ISO_DATE)));
        student.setCgpa(Float.parseFloat(m.get("cgpa")));
        student.setJoinDate(Date.valueOf(LocalDate.parse(m.get("joinDate"), DateTimeFormatter.ISO_DATE)));
        student.setSemester(Integer.parseInt(m.get("semester")));
        student.setYear(Integer.parseInt(m.get("year")));
        student.setBacklogs(Integer.parseInt(m.get("backlogs")));
        student.setUser(user);

        try {
            repo.save(user);
            studentRepo.save(student);
        } catch (Exception e) {
            return "Error creating student: " + e.getMessage();
        }

        return "Done";
    }

    public String createTeacher(Map<String, String> m) {
        Users user = repo.findById(m.get("usn")).orElse(new Users());
        user.setUsn(m.get("usn"));
        user.setRole(RoleEnum.TEACHER);
        user.setEmail(m.get("email"));
        user.setPassword(encoder.encode(m.get("password")));
        user.setPhone(m.get("phone"));

        Teacher teach;
        if (m.containsKey("id") && m.get("id") != null && !m.get("id").isEmpty()) 
            teach = teacherRepo.findById(Long.parseLong(m.get("id"))).orElse(new Teacher());
        else  
            teach = new Teacher();

        teach.setName(m.get("name"));
        teach.setAge(Integer.parseInt(m.get("age")));
        teach.setDob(Date.valueOf(LocalDate.parse(m.get("dob"), DateTimeFormatter.ISO_DATE)));
        teach.setJoinDate(Date.valueOf(LocalDate.parse(m.get("joinDate"), DateTimeFormatter.ISO_DATE)));
        teach.setSalary(new BigInteger(m.get("salary")));
        teach.setUser(user);

        try {
            repo.save(user);
            teacherRepo.save(teach);
        } catch (Exception e) {
            return "Error creating teacher: " + e.getMessage();
        }
        return "Done";
    }

    public String createAdmin(Map<String, String> m) {
        Users user = repo.findById(m.get("usn")).orElse(new Users());
        user.setUsn(m.get("usn"));
        user.setRole(RoleEnum.ADMIN);
        user.setEmail(m.get("email"));
        user.setPassword(encoder.encode(m.get("password")));
        user.setPhone(m.get("phone"));

        Admin admin;
        if (m.containsKey("id") && m.get("id") != null && !m.get("id").isEmpty()) 
            admin = adminRepo.findById(Long.parseLong(m.get("id"))).orElse(new Admin());
        else
            admin = new Admin();

        admin.setName(m.get("name"));
        admin.setAge(Integer.parseInt(m.get("age")));
        admin.setDob(Date.valueOf(LocalDate.parse(m.get("dob"), DateTimeFormatter.ISO_DATE)));
        admin.setJoinDate(Date.valueOf(LocalDate.parse(m.get("joinDate"), DateTimeFormatter.ISO_DATE)));
        admin.setSalary(new BigInteger(m.get("salary")));
        admin.setUser(user);

        try {
            repo.save(user);
            adminRepo.save(admin);
        } catch (Exception e) {
            return "Error creating admin: " + e.getMessage();
        }
        return "Done";
    }


    public returnUser getStudents() {
        List<Student> list = studentRepo.findAll();
    
        List<String> head = Arrays.asList(
            "USN", "Name", "Email", "Phone", "Branch", "Age", "Year", "CGPA", 
            "Semester", "Backlogs", "Proctor", "Quota", "Fees Status"
        );
    
        List<String> keys = Arrays.asList(
            "USN", "Name", "Email", "Phone", "Branch", "Age", "Year", "CGPA", 
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
                stud.getCgpa(),
                stud.getYear(),
                stud.getSemester(),
                stud.getBacklogs(),
                stud.getQuotaName().getName(),
                stud.isFeesStatus(),
                stud.getProctor().getName()
            );
            l.add(u);
        }
        return new returnUser(head, keys, l);
    }
    
    public returnUser getTeachers() {
        List<Teacher> list = teacherRepo.findAll();
    
        List<String> head = Arrays.asList(
            "USN", "Email", "Phone", "Branch", "Name", "Age", 
            "DOB", "Join Date", "Salary"
        );
    
        List<String> keys = Arrays.asList(
            "usn", "email", "phone", "branch", "name", "age", 
            "dob", "joinDate", "salary"
        );
    
        List<user> l = new ArrayList<>();
        for (Teacher us : list) {
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
    
    public returnUser getAdmins() {
        List<Admin> list = adminRepo.findAll();
    
        List<String> head = Arrays.asList(
            "USN", "Email", "Phone", "Branch", "Name", "Age", 
            "DOB", "Join Date", "Salary"
        );
    
        List<String> keys = Arrays.asList(
            "usn", "email", "phone", "branch", "name", "age", 
            "dob", "joinDate", "salary"
        );
    
        List<user> l = new ArrayList<>();
        for (Admin us : list) {
            user u = new user(
                us.getUser().getUsn(),
                us.getUser().getEmail(),
                us.getUser().getPhone(),
                us.getBranch(),
                us.getId(),
                us.getName(),
                us.getAge(),
                us.getDob(),
                us.getJoinDate(),
                us.getSalary(),
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

    public String UpdateTeachers(List<Map<String, String>> list) {
        try {
            for (Map<String, String> m : list) {
                Teacher teacher = teacherRepo.findById(Long.parseLong(m.get("id"))).orElse(null);
                if (teacher == null) continue;
    
                Users user = teacher.getUser();
                user.setEmail(m.get("email"));
                user.setPhone(m.get("phone"));
    
                teacher.setName(m.get("name"));
                teacher.setAge(Integer.parseInt(m.get("age")));
                teacher.setDob(Date.valueOf(LocalDate.parse(m.get("dob"), DateTimeFormatter.ISO_DATE)));
                teacher.setJoinDate(Date.valueOf(LocalDate.parse(m.get("joinDate"), DateTimeFormatter.ISO_DATE)));
                teacher.setSalary(new BigInteger(m.get("salary")));
    
                repo.save(user);
                teacherRepo.save(teacher);
            }
        } catch (Exception e) {
            return "Error updating teachers: " + e.getMessage();
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
    

    public String UpdateAdmin(List<Map<String, String>> list) {
        try {
            for (Map<String, String> m : list) {
                Admin admin = adminRepo.findById(Long.parseLong(m.get("id"))).orElse(null);
                if (admin == null) continue;
    
                Users user = admin.getUser();
                user.setEmail(m.get("email"));
                user.setPhone(m.get("phone"));
    
                admin.setName(m.get("name"));
                admin.setAge(Integer.parseInt(m.get("age")));
                admin.setDob(Date.valueOf(LocalDate.parse(m.get("dob"), DateTimeFormatter.ISO_DATE)));
                admin.setJoinDate(Date.valueOf(LocalDate.parse(m.get("joinDate"), DateTimeFormatter.ISO_DATE)));
                admin.setSalary(new BigInteger(m.get("salary")));
    
                repo.save(user);
                adminRepo.save(admin);
            }
        } catch (Exception e) {
            return "Error updating admins: " + e.getMessage();
        }
        return "Done";
    }
    
}
