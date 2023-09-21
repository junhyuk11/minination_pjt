package com.ssafy.mini.domain.tax.repository;

import com.ssafy.mini.domain.tax.entity.Tax;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxRepository extends JpaRepository<Tax, Integer>, TaxRepositoryCustom{

    Tax findTaxByNationSeqAndTaxType(Short nationSeq, String taxType);

}
