package com.zigzag.app.config.auth;

import com.zigzag.app.config.filter.JwtRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsUtils;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .formLogin(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(httpRequests -> httpRequests
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll() // Preflight 요청은 허용 , 사전 인증이라는 요청 방식은 허용하겠다
                        .requestMatchers(new AntPathRequestMatcher("/")
                                , new AntPathRequestMatcher("/css/**")
                                , new AntPathRequestMatcher("/images/**")
                                , new AntPathRequestMatcher("/h2-console/**")
                                , new AntPathRequestMatcher("/profile")
                        ).permitAll()
                        .requestMatchers("/v1/oauth/login/**").permitAll()
                        .requestMatchers("/api/v1/application").permitAll()
                        .requestMatchers("/v1/oauth/user/info").permitAll()
                        .anyRequest().authenticated()
                ).addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}