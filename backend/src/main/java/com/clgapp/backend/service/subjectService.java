package com.clgapp.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clgapp.backend.Model.Subjects;
import com.clgapp.backend.Repository.subjectsRepo;

@Service
public class subjectService {

    @Autowired
    private subjectsRepo repo;

    public String createSub(Subjects sub) {
        try {
            repo.save(sub);
        } catch (Exception e) {
           return "Error :" + e.getMessage();
        }
        return "Done";
    }

    public String updateSub(Subjects sub) {
        try {
            repo.save(sub);
        } catch (Exception e) {
            return "Error :" + e.getMessage();
        }
        return "Updated";
    }

    public String deleteSubject(String subjCode) {
        try {
            List<Subjects> subject = repo.findByCode(subjCode);
            if(subject == null)
                return "Subject not found";
            repo.deleteAll(subject);

        } catch (Exception e) {
            return "Error:" + e.getMessage();
        }
        return "Done";
    }    
}
