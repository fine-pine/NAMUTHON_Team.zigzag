package com.zigzag.app.service;

import com.zigzag.app.dto.ApplicationListResponseDto;
import com.zigzag.app.dto.ApplicationSaveRequestDto;
import com.zigzag.app.entity.Application;
import com.zigzag.app.entity.User;
import com.zigzag.app.repository.ApplicationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.stream.Collectors;

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

            if (currentUser != null) {
                Application application = Application.builder()
                        .user(currentUser)
                        .watt(requestDto.getWatt())
                        .address(requestDto.getAddress())
                        .phoneNumber(requestDto.getPhone_number())
                        .date(requestDto.getDate())
                        .bank(requestDto.getBank())
                        .account(requestDto.getAccount())
                        .status(requestDto.getStatus())
                        // 필요한 만큼 다른 필드를 추가
                        .build();
                try {
                    applicationRepository.save(application);
                    return ResponseEntity.ok().body("신청을 완료하였습니다. ");
                } catch (Exception e) {
                    e.printStackTrace();
                    return ResponseEntity.ok().body("신청 처리 중 오류가 발생하였습니다. ");
                }
            } else {
                return ResponseEntity.ok().body("유저 정보를 찾을 수 없습니다. ");
            }
        }
    }

    @Transactional
    public List<ApplicationListResponseDto> getApplicationList() {
        return applicationRepository.findAllByOrderByModifiedDateDesc()
                .stream()
                .map(application -> ApplicationListResponseDto.builder()
                        .id(application.getId())
                        .watt(application.getWatt())
                        .modifiedDate(application.getModifiedDate())
                        .status(application.getStatus())
                        .build())
                .collect(Collectors.toList());
    }
}
