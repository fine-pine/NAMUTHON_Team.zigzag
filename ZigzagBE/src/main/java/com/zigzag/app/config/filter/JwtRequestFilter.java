package com.zigzag.app.config.filter;

import com.zigzag.app.config.jwt.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    public JwtRequestFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (bearerToken != null && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // 이 필터는 들어오는 요청을 가로채고, "AUTH-TOKEN" 쿠키에서 JWT 토큰을 확인한다.
    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("=======================doFilterInternal===========================");
        String token = resolveToken(request);
        System.out.println("DoRequestFilter token: " + token);

        Authentication authentication;

        if ((authentication = jwtUtils.verifyAndGetAuthentication(token)) != null) {
            // 애플리케이션에서 이후의 인가 확인에 사용할 수 있도록 한다.
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("validate success");
        } else {
            // 토큰이 null이거나 유효하지 않은 경우 인증 정보를 제거한다.
            SecurityContextHolder.clearContext();
        }

        // 필터 체인을 계속 진행하고 요청이 다음 필터나 대상 컨트롤러로 전달될 수 있도록 한다.
        // JWT 토큰을 확인하고, 인증된 사용자를 보다시피 보안 텍스트에 설정하여 애플리케이션에 추가적인 인가 확인을 수행하는 역할을 담당한다.
        filterChain.doFilter(request, response);
    }
}