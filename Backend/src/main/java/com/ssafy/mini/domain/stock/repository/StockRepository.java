package com.ssafy.mini.domain.stock.repository;

import com.ssafy.mini.domain.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Integer> {
}
