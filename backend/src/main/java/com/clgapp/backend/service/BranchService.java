package com.clgapp.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clgapp.backend.Model.Branches;
import com.clgapp.backend.Model.Fees;
import com.clgapp.backend.Repository.BranchRepo;
import com.clgapp.backend.Repository.FeesRepo;

@Service
public class BranchService {

    @Autowired
    private BranchRepo repo;

    @Autowired
    private FeesRepo frepo;

    public String addBranch(Branches branch) {
        try {
            repo.save(branch);
        } catch (Exception e) {
            return "Error:" + e.getMessage(); 
        }
        return "Done";
    }

    public String deleBranch(String name) {
        List<Fees> f = frepo.findByBranch(name);
        
        Branches b = repo.findById(name).orElse(null);
        if(b == null)
            return "Branch not found";
        try {
            repo.delete(b);
            frepo.deleteAll(f);
        } catch (Exception e) {
            return "Error:" + e.getMessage();    
        }
        return "Done";
    }
    
}
