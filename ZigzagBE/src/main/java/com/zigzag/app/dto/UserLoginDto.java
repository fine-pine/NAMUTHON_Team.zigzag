package com.zigzag.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
public class UserLoginDto {
    private String email;
    private String name;
    private String picture;
}
