package com.ssafy.mini.domain.stockholding.repository;

import com.ssafy.mini.domain.stockholding.dto.response.PortfolioDto;
import com.ssafy.mini.domain.stockholding.entity.Stockholding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StockholdingRepository extends JpaRepository<Stockholding, Long>, StockholdingCustom {

    List<PortfolioDto> findAllByMemberId(String memberId);

    Optional<Stockholding> findByMemberIdAndCode(String memberId, String code);

}
