package com.zigzag.app.dto;

import com.zigzag.app.entity.Application;
import com.zigzag.app.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ApplicationSaveRequestDto {
    private User user;
    private Long watt;
    private String address;
    private String phoneNumber;
    private String bank;
    private String account;
    private Integer status = 0;
    private LocalDate date;

    public Application toEntity() {
        return Application.builder()
                .watt(watt)
                .address(address)
                .phoneNumber(phoneNumber)
                .bank(bank)
                .account(account)
                .status(status)
                .date(date)
                .build();
    }
}
