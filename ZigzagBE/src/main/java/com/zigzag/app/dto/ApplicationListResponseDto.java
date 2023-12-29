package com.zigzag.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class ApplicationListResponseDto {
    private Long id;
    private Long watt;
    private LocalDate modifiedDate;
    private Integer status;
}
