package com.zigzag.app.controller;

import com.zigzag.app.dto.ApplicationListResponseDto;
import com.zigzag.app.dto.ApplicationSaveRequestDto;
import com.zigzag.app.service.ApplicationService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ApplicationController {
    private final ApplicationService applicationService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/v1/post/application")
    public ResponseEntity<?> saveApplication(@RequestBody ApplicationSaveRequestDto requestDto) {
        System.out.println("===post application test===");

        return applicationService.save(requestDto);
    }

    @GetMapping("/api/v1/applications")
    public List<ApplicationListResponseDto> getApplicationList() {
        System.out.println("======== Get Application List ==========");

        return applicationService.getApplicationList();
    }
}
