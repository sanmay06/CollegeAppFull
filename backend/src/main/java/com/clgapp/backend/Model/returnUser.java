package com.clgapp.backend.Model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class returnUser {
    
    List<String> headings ;

    List<String> keys;

    List<user> users;
}
