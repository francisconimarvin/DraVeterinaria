package com.draveterinaria.cl.scheduling.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name = "USERS", schema = "ADMIN")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "PASSWORD_HASH", nullable = false)
    private String passwordHash;

    @Column(name = "ROLE", nullable = false)
    private String role;

    @Column(name = "ENTITY_ID")
    private Long entityId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CREATED_AT", updatable = false)
    private Date createdAt;


}

