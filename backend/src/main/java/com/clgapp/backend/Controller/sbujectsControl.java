package com.clgapp.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clgapp.backend.Model.Subjects;
import com.clgapp.backend.service.subjectService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/subjects")
public class sbujectsControl {
    
    @Autowired
    private subjectService service;

    @PostMapping("/create")
    public String createSubject(@RequestBody Subjects sub) {
        return service.createSub(sub);
    }
    
    @PutMapping("/update")
    public String updateSubject(@RequestBody Subjects subj) {
        return service.updateSub(subj);
    }

    @DeleteMapping("/delete")
    public String deleteSubject(@RequestBody String subjcode) {
        return service.deleteSubject(subjcode);
    } 

}
