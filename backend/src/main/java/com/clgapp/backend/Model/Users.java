package com.clgapp.backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Users {

    @Id
    private String usn;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    private String phone;
    
    public String getUsn() {
        return usn;
    }

    public String getEmail() {
        return email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public String getRole() {
        return role.toString();
    }
    
    public String getPhone() {
        return phone;
    }

    

}