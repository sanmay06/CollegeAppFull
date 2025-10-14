package com.clgapp.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clgapp.backend.Model.Role;
import com.clgapp.backend.Model.Roles;
import com.clgapp.backend.Model.Users;
import com.clgapp.backend.Repository.RoleRepo;
import com.clgapp.backend.Repository.rolesRepo;
import com.clgapp.backend.Repository.userRepo;

@Service
public class roleService {
    
    @Autowired
    private userRepo userrepo;

    @Autowired
    private rolesRepo rolesRepo;

    @Autowired
    private RoleRepo roleRepo;

    public String createRole(Roles role) {
        try {
            rolesRepo.save(role);
        } catch (Exception e) {
            return "Error creating role: " + e.getMessage();
        }
        return "Role created successfully";
    }

    public String deleteRole(Roles role) {
       try {
         rolesRepo.delete((role));
       } catch (Exception e) {
            return "Error occured:" + e.getMessage();
       }
       return "Role deleted successfully";
    }

    public List<Roles> getAllRoles() {
        List<Roles> rolesList = rolesRepo.findAll();
        return rolesList;
    }

    public String assignRole(String userId, String roleName) {

        Roles roles = rolesRepo.findById(roleName).orElse(null);
        if(roles == null) 
            return "Couldnt find the rolename";
        
        Users user = userrepo.findById(userId).orElse(null);
        if(user == null)
            return "User not found";

        List<Role> l = roleRepo.findByUSN(userId);
        for(Role r: l) 
            if(r.getPrivilage().getRoleName() == roleName)
                return "User already has the role assigned";

        Role r = new Role();
        r.setUser(user);
        r.setPrivilage(roles);

        try {
            roleRepo.save(r);
        } catch (Exception e) {
            return "Error assigning the role:" + e.getMessage();
        }

        return "Role assigned successfully";
    }

    public String removeRole(String usn, String roleName) {

        Roles roles = rolesRepo.findById(roleName).orElse(null);
        if(roles == null) 
            return "Couldnt find the rolename";
        
        Users user = userrepo.findById(usn).orElse(null);
        if(user == null)
            return "User not found";

        Role r = new Role();
        r.setUser(user);
        r.setPrivilage(roles);

        try {
            roleRepo.delete(r);
            return "Role deleted Succesfully";
        } catch (Exception e) {
            return "Error deleting the role:" + e.getMessage();
        }
        
    }

    public String removeId(int id) {
        try {
            roleRepo.deleteById(id);
        } catch (Exception e) {
            return "Error occured while removing role";
        }
        return "successfully deleted";
    }

}
