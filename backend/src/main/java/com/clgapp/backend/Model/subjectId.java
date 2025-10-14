package com.clgapp.backend.Model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class subjectId implements Serializable{
    
    private String code;

    @Enumerated(EnumType.STRING)
    private subType type;

    public subjectId(String code, subType type) {
        this.code = code;
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if(!(o instanceof subjectId)) return false;
        subjectId sub = (subjectId) o;
        return Objects.equals(code, sub.code) && Objects.equals(type, sub.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code, type);
    }

}
