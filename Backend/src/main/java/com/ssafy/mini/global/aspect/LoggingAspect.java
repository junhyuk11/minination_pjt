package com.ssafy.mini.global.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Pointcut("within(com.ssafy.mini.domain..*)")
    public void beforeMethodStart() {
    }

    @Before("beforeMethodStart()")
    public void before(JoinPoint joinPoint) {
        log.info("{} called", joinPoint.getSignature().toShortString());
    }
}
