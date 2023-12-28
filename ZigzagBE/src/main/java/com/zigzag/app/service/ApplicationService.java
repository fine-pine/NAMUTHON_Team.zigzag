package com.zigzag.app.service;

import com.zigzag.app.dto.ApplicationSaveRequestDto;
import com.zigzag.app.entity.User;
import com.zigzag.app.repository.ApplicationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

@Service
@Transactional
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final UserService userService;

    @Transactional
    public ResponseEntity<?> save(ApplicationSaveRequestDto requestDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return ResponseEntity.ok().body("유저 정보가 없습니다. ");
        } else {
            long user_id = Long.valueOf((String) authentication.getPrincipal());
            User currentUser = userService.getUser(user_id);

            requestDto.setUser(currentUser);
            applicationRepository.save(requestDto.toEntity());
            return ResponseEntity.ok().body("신청을 완료하였습니다. ");
        }
    }
}
