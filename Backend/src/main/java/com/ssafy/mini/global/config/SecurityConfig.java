package com.ssafy.mini.global.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.RequestCacheConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .authorizeRequests()
                .mvcMatchers(HttpMethod.OPTIONS).permitAll() // preflight 요청은 모두 허용

                // swagger 요청은 모두 허용
                .antMatchers("/v2/api-docs", "/configuration/**", "/swagger*/**", "/webjars/**").permitAll()

                // member 요청은 모두 허용
                .mvcMatchers(HttpMethod.POST, "/member/login").permitAll()
                .mvcMatchers(HttpMethod.POST, "/member/join").permitAll()
                .mvcMatchers(HttpMethod.POST, "/member/id").permitAll()

                // auth 테스트
                .mvcMatchers(HttpMethod.GET, "/auth/test").permitAll()

                // 그 외의 요청은 모두 인증 필요
                .anyRequest().authenticated();

        return http.build();
    }

    @Bean
    @Order(0)
    public SecurityFilterChain resources(HttpSecurity http) throws Exception {
        return http
                .requestMatchers(matchers -> matchers.antMatchers("/resources/**"))
                .authorizeRequests(authorize -> authorize
                        .anyRequest().permitAll())
                .requestCache(RequestCacheConfigurer::disable)
                .securityContext(AbstractHttpConfigurer::disable)
                .sessionManagement(AbstractHttpConfigurer::disable)
                .build();
    }

}
