package com.ssafy.mini.domain.tax.service;

import com.ssafy.mini.domain.tax.entity.Tax;
import com.ssafy.mini.domain.tax.repository.TaxRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class TaxServiceImpl implements TaxService {

    private final TaxRepository taxRepository;

    @Override
    public void saveTax(Tax tax) {
        taxRepository.save(tax);
    }

    @Override
    public void updateTax(Short nationSeq, String taxTp, Byte taxRate) {
        log.info("Service Layer::TaxService-update() called");

        Tax tax = taxRepository.findTaxByNationSeqAndTaxType(nationSeq, taxTp);
        tax.changeTax(taxRate);

        taxRepository.save(tax);
    }

}
