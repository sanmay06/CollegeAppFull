package com.clgapp.backend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.clgapp.backend.Model.TimeTable;
import com.clgapp.backend.service.timeTableService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/timetable")
public class timeTableController {

    @Autowired
    private timeTableService service;

    @PostMapping("/student")
    public List<TimeTable> retrieveForStudents(@RequestBody Map<String, String> m) {
        return service.getAllTTStudents(m);
    }
    
    @PostMapping("/teacher")
    public List<TimeTable> retrieveForTeachers(@RequestBody Map<String, String> m) {
        return service.getAllTTTeachers(m);
    }
    
    @PostMapping("/create")
    public String CreateListMethod(@RequestBody List<TimeTable> l) {
        return service.CreateAll(l);
    }
    
    @PutMapping("/update")
    public String putMethodName(@RequestBody List<TimeTable> l) {
        return service.UpdateAll(l);
    }

    @DeleteMapping("/delete/{id}")
    public String DeleteById(@RequestParam int id) {
        return service.deleteOne(id);
    }

    @DeleteMapping("/deleteId")
    public String DeleteByIdList(@RequestBody List<Integer> ids) {
        return service.deleteByIdList(ids);
    }

    @DeleteMapping("/deleteAll") 
    public String DeleteBySemesterAndClass(@RequestBody Map<String, String> m) {
        return service.DeleteBySemesterAndClass(m.get("sem"), m.get("sec"),m.get("branch"));
    }
}
