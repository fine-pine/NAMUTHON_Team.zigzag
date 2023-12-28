package com.zigzag.app.controller;

import com.zigzag.app.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(value = "/v1/oauth/login")
    public ResponseEntity LoginWithGoogleOAuth2(@RequestParam("code") String accessCode, HttpServletResponse response) throws GeneralSecurityException, IOException {
        // IdTokenRequestDto 는 요청 바디에서 받아온 ID 토큰을 담고 있다.
        String authToken = userService.loginOAuthGoogle(accessCode);
        System.out.println(authToken);

        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Authorization", authToken);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/v1/oauth/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {

        // 클라이언트 측에 저장된 토큰을 무효화하고 삭제하기 위해 응답 헤더에 토큰을 제거하는 코드 추가
        response.setHeader("Authorization", "");

        SecurityContextHolder.clearContext();
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().build();
    }
}
