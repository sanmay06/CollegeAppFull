package com.clgapp.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clgapp.backend.Model.Branches;
import com.clgapp.backend.service.BranchService;

@RestController
@RequestMapping("/branch")
public class BranchController {

    @Autowired
    private BranchService service;

    @GetMapping("/all")
    public List<Branches> getAllBranches() {
        return service.getAllBranches();
    }
    
    @PostMapping("/add")
    public String addBranch(@RequestBody Branches branch) {
        return service.addBranch(branch);
    }

    @PutMapping("/update")
    public String updateBranch(@RequestBody Branches branch) {
        return service.addBranch(branch);
    }

    @DeleteMapping("/delete/{name}")
    public String deleteBranch(@PathVariable String name){
        return service.deleBranch(name);
    }

}
