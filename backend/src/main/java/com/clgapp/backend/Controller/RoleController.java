package com.clgapp.backend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clgapp.backend.Model.Roles;
import com.clgapp.backend.service.roleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private roleService roleService;
    
    @PostMapping("/create")
    public String createRole(@RequestBody Roles role) {
        return roleService.createRole(role);
    }

    @DeleteMapping("/delete")
    public String deleteroles(@RequestBody Roles role) {
        return roleService.deleteRole(role);
    }

    @GetMapping("/getAllRoles")
    public List<Roles> getAllRoles() {
        return roleService.getAllRoles();
    }
    
    @GetMapping("/assign")
    public String assignRoles(@RequestParam Map<String, String> m) {
        return roleService.assignRole(m.get("usn"), m.get("roleName"));
    }
    
    @GetMapping("/remove")
    public String RemoveRole(@RequestParam Map<String, String> m) {
        return roleService.removeRole(m.get("usn"), m.get("roleName"));
    }
    
    @GetMapping("/remove/{id}")
    public String getMethodName(@PathVariable("id") int id) {
        return roleService.removeId(id);
    }
    
}
