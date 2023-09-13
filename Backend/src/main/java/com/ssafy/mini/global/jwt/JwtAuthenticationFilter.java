package com.ssafy.mini.global.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            final String token = request.getHeader("Authorization");

            // token이 없으면 로그인하지 않은 상태
            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            jwtProvider.validateToken(token);
            setAuthentication(token);

            filterChain.doFilter(request, response);
        }

        private void setAuthentication(final String accessToken) {
            String id = jwtProvider.extractMemberId(accessToken);
            List<GrantedAuthority> grantedAuthorities = Collections.singletonList(
                    new SimpleGrantedAuthority("ROLE_USER"));
            JwtAuthenticationToken authentication = new JwtAuthenticationToken(grantedAuthorities, id);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

}
