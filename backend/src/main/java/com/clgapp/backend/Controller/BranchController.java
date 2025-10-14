package com.clgapp.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.clgapp.backend.Model.Branches;
import com.clgapp.backend.service.BranchService;

@RestControllerAdvice
@RequestMapping("/branch")
public class BranchController {

    @Autowired
    private BranchService service;
    
    @PostMapping("/add")
    public String addBranch(@RequestBody Branches branch) {
        return service.addBranch(branch);
    }

    @PutMapping("/update")
    public String uodateBranch(@RequestBody Branches branch) {
        return service.addBranch(branch);
    }

    @DeleteMapping("/delete")
    private String deleBranch(@RequestBody String name){
        return service.deleBranch(name);
    }

}
