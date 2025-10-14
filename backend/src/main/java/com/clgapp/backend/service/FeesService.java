package com.clgapp.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clgapp.backend.Model.Fees;
import com.clgapp.backend.Model.Quota;
// import com.clgapp.backend.Model.Search;
import com.clgapp.backend.Repository.FeesRepo;
import com.clgapp.backend.Repository.QuotaRepo;

@Service
public class FeesService {
    
    @Autowired
    private QuotaRepo qrepo;
    
    @Autowired
    private FeesRepo frepo;

    public String createQuota(Quota q) {
        try {
            qrepo.save(q);
        } catch (Exception e) {
            return "Error:" + e.getMessage();
        }
        return"Done";
    }

    public String updateQuota(List<Quota> quotas) {
        try{
            for(Quota q: quotas) {
                createQuota(q);
            }
        } catch (Exception e) {
             return "Error:" + e.getMessage();
        }

        return "Done";
    }

    public String deleteQuota(String name) {
        try {
            Quota q = qrepo.findById(name).orElse(null);
            if(q == null) 
                return "No quota found";
            qrepo.delete(q);
        } catch (Exception e) {
            return "Error:" + e.getMessage();
        }
        return"Done";
    }

    public String addFees(Fees f) {
        try {
            frepo.save(f);
        } catch (Exception e) {
            return "Error:" + e.getMessage();
        }
        return"Done";
    }

    public String deletefees(Long id) {
        try {
            frepo.deleteById(id);
        } catch (Exception e) {
            return "Error:" + e.getMessage();
        }
        return"Done";
    }

    public List<Quota> getQuotas() {
        return qrepo.findAll();
    }

    public List<String> searchQuota() {
        // Search search = new Search();
        return qrepo.findAllIds();
    }
}
