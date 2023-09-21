package com.ssafy.mini.domain.tax.service;

import com.ssafy.mini.domain.tax.entity.Tax;

public interface TaxService {
    void saveTax(Tax tax);

    void updateTax(Short nationSeq, String taxTp, Byte taxRate);
}
