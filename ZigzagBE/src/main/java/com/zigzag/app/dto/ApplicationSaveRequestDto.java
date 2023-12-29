package com.zigzag.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zigzag.app.entity.Application;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApplicationSaveRequestDto {
    private Long watt;
    private String address;
    private String phone_number;
    private String bank;
    private String account;
    private Integer status = 0;
    private LocalDate date;

    public Application toEntity() {
        return Application.builder()
                .watt(watt)
                .address(address)
                .phoneNumber(phone_number)
                .bank(bank)
                .account(account)
                .status(status)
                .date(date)
                .build();
    }
}
