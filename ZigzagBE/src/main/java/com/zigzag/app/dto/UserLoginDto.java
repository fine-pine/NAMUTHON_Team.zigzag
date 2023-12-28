package com.zigzag.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class UserLoginDto {
    private String email;
    private String name;
    private String picture;
}
