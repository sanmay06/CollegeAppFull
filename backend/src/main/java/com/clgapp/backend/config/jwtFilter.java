package com.clgapp.backend.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.clgapp.backend.service.LoginService;
import com.clgapp.backend.service.jwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class jwtFilter extends OncePerRequestFilter{

    @Autowired
    private jwtService jwtService;

    @Autowired
    ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();

        if (path.equals("/login") || path.equals("/register") ) {
            filterChain.doFilter(request, response);
            return;
        }
        
        String header = request.getHeader("Authorization");
        String token = "", usn = "";

        
        if(header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            usn = jwtService.extractUSN(token);
        }

        if(usn != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails user = context.getBean(LoginService.class).loadUserByUsername(usn);

            if(jwtService.validate(token, user)) {
                UsernamePasswordAuthenticationToken token2 = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                token2.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(token2);
            }
        }
        filterChain.doFilter(request, response);
    }
    
}
