package com.clgapp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.clgapp.backend.Model.UserPrincipals;
import com.clgapp.backend.Model.Users;
import com.clgapp.backend.Repository.userRepo;


@Service
public class LoginService implements UserDetailsService {

    @Autowired
    private userRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Username:" + username);
        Users user = repo.findById(username).orElse(null);
        if( user == null) 
            throw new UsernameNotFoundException("User not found with username: " + username);

        UserDetails userDets = new UserPrincipals(user);
        return userDets;
    }

}
