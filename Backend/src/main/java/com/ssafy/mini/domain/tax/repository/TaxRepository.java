package com.ssafy.mini.domain.tax.repository;

import com.ssafy.mini.domain.nation.entity.Nation;
import com.ssafy.mini.domain.tax.entity.Tax;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaxRepository extends JpaRepository<Tax, Integer>, TaxRepositoryCustom{

    Tax findTaxByNationSeqAndTaxType(Short nationSeq, String taxType);

    List<Tax> findByNation(Nation nation);
}
