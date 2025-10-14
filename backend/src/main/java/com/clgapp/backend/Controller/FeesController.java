package com.clgapp.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.clgapp.backend.Model.Fees;
import com.clgapp.backend.Model.Quota;
// import com.clgapp.backend.Model.Search;
import com.clgapp.backend.service.FeesService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class FeesController {
    
    @Autowired
    private FeesService service;

    @PostMapping("/quota/create")
    public String createQuota(@RequestBody Quota q) {
        return service.createQuota(q);
    }

    @GetMapping("/quota")
    public List<Quota> GetQuotas() {
        return service.getQuotas();
    }
    
    @GetMapping("/quota/search")
    public List<String> searchQuota() {
        return service.searchQuota();
    }

    @PutMapping("/quota/update")
    public String updateQuota(@RequestBody List<Quota> q) {
        return service.updateQuota(q);
    }

    @DeleteMapping("/quota/delete")
    public String deleteQuota(@RequestBody String name) {
        return service.deleteQuota(name);
    }

    @PostMapping("/fees/create")
    public String AddFees(@RequestBody Fees f) {
        return service.addFees(f);
    }
    
    @PostMapping("/fees/update")
    public String updateFees(@RequestBody Fees f) {
        return service.addFees(f);
    }

    @DeleteMapping("/Fees/delete")
    public String deleteFees(@RequestBody Long id) {
        return service.deletefees(id);
    }

}
