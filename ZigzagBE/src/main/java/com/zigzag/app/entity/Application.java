package com.zigzag.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "APPLICATIONS")
@Builder
@AllArgsConstructor
public class Application extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    private User user;

    @NotNull
    private Long watt;

    @NotNull
    private String address;

    @NotNull
    private String phoneNumber;

    @NotNull
    private String bank;

    @NotNull
    private String account;

    @NotNull
    private Integer status;

    private String description;

    private LocalDate admittedAt;

    private LocalDate collectedAt;
}
