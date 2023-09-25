package com.ssafy.mini.domain.shop.repository;

import com.ssafy.mini.domain.nation.entity.Nation;
import com.ssafy.mini.domain.shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findAllByIsoSeq(Nation nation);

}
