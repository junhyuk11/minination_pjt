package com.ssafy.mini.global.jwt;


import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Objects;
import java.util.concurrent.TimeUnit;


@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final JwtProperties jwtProperties;
    private final RedisTemplate<String, String> redisTemplate;

    private Key getSecretKey() {
        return Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Access Token 생성 및 저장
     * @param id String
     * @return accessToken String
     */
    public String generateAccessToken(String id) {
        Claims claims = Jwts.claims().setSubject(id);
        Date now = new Date();

        final String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtProperties.getAccessTokenValidityInSeconds()))
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
        storeToken(accessToken, id, jwtProperties.getAccessTokenValidityInSeconds());
        return accessToken;
    }

    /**
     * Refresh Token 생성 및 저장
     * @param id String
     * @return refreshToken String
     */
    public String generateRefreshToken(String id) {
        Claims claims = Jwts.claims().setSubject(id);
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtProperties.getRefreshTokenValidityInSeconds()))
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * cache에 토큰 저장
     * @param token String
     * @param id String
     * @param period long
     */
    private void storeToken(String token, String id, long period) {
        redisTemplate.opsForValue().set(
                token,
                id,
                period,
                TimeUnit.SECONDS);
    }


    /**
     * 토큰 유효성 검증
     * @param token String
     * @return memberId String
     */
    public String validateToken (String token) {
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build();
        try {
            jwtParser.parse(token);
            return extractMemberId(token);
        } catch (MalformedJwtException | SignatureException | IllegalArgumentException e) {
            throw new MNException(ErrorCode.INVALID_TOKEN);
        } catch (ExpiredJwtException e) {
            throw new MNException(ErrorCode.EXPIRED_TOKEN);
        }
    }

    /**
     * 토큰에서 memberId 추출
     * @param token String
     * @return
     */
    public String extractMemberId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * refresh token 유효성 검증
     * @param refreshoken
     * @return
     */
    public String validateRefreshToken (String refreshoken) {
        final String id = validateToken(refreshoken);
        final String storedRefreshToken = redisTemplate.opsForValue().get(id);
        if(!Objects.equals(refreshoken, storedRefreshToken)) {
            throw new MNException(ErrorCode.INVALID_TOKEN);
        }
        return id;
    }


    /**
     * access tokn 재발급
     * @param refreshToken
     * @return accessToken
     */
    public String reIssue(String refreshToken) {
        validateRefreshToken(refreshToken);
        return generateAccessToken(extractMemberId(refreshToken));
    }

}
