package com.clgapp.backend.Model;

import java.util.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;
// import com.clgapp.backend.Repository.RoleRepo;

public class UserPrincipals implements UserDetails{


    private Users user;

    public UserPrincipals(Users user) {
        this.user = user;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }
    @Override
    public String getUsername() {
        return user.getUsn();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(user.getRole()));
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {  
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {    
        // TODO Auto-generated method stub
        return true;
    }

}