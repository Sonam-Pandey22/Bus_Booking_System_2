package com.backend.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Operator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long operatorId;
    private String operatorName;
    private String contactNumber;
    private String email;
    private String address;

    @OneToMany(mappedBy = "operator", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Bus> buses;
}