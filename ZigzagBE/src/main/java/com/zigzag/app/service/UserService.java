package com.zigzag.app.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zigzag.app.config.jwt.JwtUtils;
import com.zigzag.app.dto.UserLoginDto;
import com.zigzag.app.model.Role;
import com.zigzag.app.entity.User;
import com.zigzag.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.GeneralSecurityException;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtils jwtService;

    @Value("${spring.security.next-public-auth0-domain}")
    private String google_access_url;

    @Transactional
    public String loginOAuthGoogle(String idToken) throws GeneralSecurityException, IOException {   // Google OAuth 로부터 받은 ID 토큰을 검증하여 UserEntity 를 인증하고 JWT 토큰을 생성하여 반환한다
        User user = verifyGoogleToken(idToken);
        if(user ==null){
            throw new IllegalArgumentException("null user");
        }

        user=createOrUpdateUser(user);

        return jwtService.createAccessToken(user, false);
    }

    // 주어진 유저를 생성하거나 업데이트한다. 이미 존재하는 유저라면 업데이트하고, 존재하지 않는 경우 새로운 유저로 생성한다
    @Transactional
    public User createOrUpdateUser(User user) {
        User existingUser = userRepository.findByGoogleEmail(user.getGoogleEmail()).orElse(null);
        // 존재하지 않는 경우
        if(existingUser==null){
            user.setRole(Role.USER);
            userRepository.save(user);

            return user;
        }

        // 존재하는 경우
        existingUser.setGoogleEmail(user.getGoogleEmail());
        existingUser.setName(user.getName());
        existingUser.setProfileImageUrl(user.getProfileImageUrl());
        existingUser.setRole(Role.USER);

        return existingUser;
    }

    @Transactional
    public User verifyGoogleToken(String accessToken) throws JsonProcessingException, IOException {
        ObjectMapper mapper = new ObjectMapper();

        // URL 객체 생성
        URL url = new URL(google_access_url);

        // HttpURLConnection 생성
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // GET 메서드 설정
        connection.setRequestMethod("GET");

        connection.setDoOutput(false);

        // Authorization 헤더에 Bearer 토큰 추가
        connection.setRequestProperty("Authorization", "Bearer " + accessToken);

        // 응답 코드 확인
        int responseCode = connection.getResponseCode();
        System.out.println("Response Code: " + responseCode);

        // 응답 본문 읽기
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            String line;
            StringBuilder response = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            // JSON 파싱
            UserLoginDto loginDto = mapper.readValue(response.toString(), UserLoginDto.class);

            return User.builder()
                    .googleEmail(loginDto.getEmail())
                    .profileImageUrl(loginDto.getPicture())
                    .name(loginDto.getName())
                    .role(Role.USER)
                    .build();
        } finally {
            // 연결 닫기
            connection.disconnect();
        }
    }

    // id로 유저정보를 가져오는 메서드
    public User getUser(Long id){
        return userRepository.findById(id).orElse(null);
    }
}
