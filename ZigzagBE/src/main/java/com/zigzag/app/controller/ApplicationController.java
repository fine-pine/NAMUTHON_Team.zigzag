package com.zigzag.app.controller;

import com.zigzag.app.dto.ApplicationSaveRequestDto;
import com.zigzag.app.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ApplicationController {
    private final ApplicationService applicationService;

    @PostMapping("/api/v1/post/application")
    public ResponseEntity<?> saveApplication(@RequestBody ApplicationSaveRequestDto requestDto) {
        return applicationService.save(requestDto);
    }

    @GetMapping("/api/v1/application")
    public ResponseEntity<?> getAllApplication() {

    }
}
