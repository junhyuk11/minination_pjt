package com.ssafy.mini.domain.tax.repository;

import com.ssafy.mini.domain.tax.entity.Tax;

public interface TaxRepositoryCustom {

    Tax findTaxByNationSeqAndTaxType(Short nationSeq, String taxType);

}
