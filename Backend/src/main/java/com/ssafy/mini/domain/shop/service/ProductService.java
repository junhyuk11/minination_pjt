package com.ssafy.mini.domain.shop.service;

import com.ssafy.mini.domain.shop.dto.request.AddProductRequest;
import com.ssafy.mini.domain.shop.dto.response.ProductInfoResponse;

import java.util.List;

public interface ProductService {

    List<ProductInfoResponse> listProducts(String memberId);

    void addProduct(String memberId, AddProductRequest addProductRequest);

}
