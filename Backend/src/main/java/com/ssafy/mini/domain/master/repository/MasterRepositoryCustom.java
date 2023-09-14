package com.ssafy.mini.domain.master.repository;

import org.springframework.stereotype.Repository;

public interface MasterRepositoryCustom {

    String findCodeByExpression(String expression);

}
