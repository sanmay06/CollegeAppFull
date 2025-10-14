package com.clgapp.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clgapp.backend.Model.TimeTable;
import com.clgapp.backend.Repository.timeTableRepo;

import jakarta.transaction.Transactional;

@Service
public class timeTableService {
    
    @Autowired
    private timeTableRepo repo;

    public List<TimeTable> getAllTTStudents(Map<String, String> m) {
        List<TimeTable> l = repo.findAllBySemesterAndSection(m.get("sec"), m.get("sem"), m.get("branch"));
        return l;
    }

    public List<TimeTable> getAllTTTeachers(Map<String, String> m) {
        List<TimeTable> l = repo.findAllByTeacherAndBranch(m.get("name"), m.get("branch"));
        return l;
    }

    @Transactional
    public String CreateAll(List<TimeTable> l) { 
        repo.deleteAllSemAndSec(l.get(0).getSemester(), l.get(0).getSection(), l.get(0).getBranch().getBranchName());
        repo.saveAll(l);
        return "Done";
    }

    @Transactional
    public String UpdateAll(List<TimeTable> l) {
        repo.saveAll(l);
        return "Done";
    }

    public String deleteOne(int id) {
        repo.deleteById(id);
        return "Done";
    }

    @Transactional
    public String DeleteBySemesterAndClass(String sem, String sec, String branch) {
        repo.deleteAllSemAndSec(sem, sec, branch);
        return "Done";
    }

    public String deleteByIdList(List<Integer> ids) {
        for (Integer id : ids) {
            repo.deleteById(id);
        }
       return "Done";
    }

}
