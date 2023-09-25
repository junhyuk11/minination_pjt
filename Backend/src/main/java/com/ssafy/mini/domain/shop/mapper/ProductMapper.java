package com.ssafy.mini.domain.shop.mapper;

import com.ssafy.mini.domain.shop.dto.request.AddProductRequest;
import com.ssafy.mini.domain.shop.dto.response.ProductInfoResponse;
import com.ssafy.mini.domain.shop.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "prodName", target = "product")
    @Mapping(source = "prodDesc", target = "desc")
    @Mapping(source = "prodPrice", target = "price")
    ProductInfoResponse productToProductInfoResponse(Product product);

    @Mapping(source = "product", target = "prodName")
    @Mapping(source = "desc", target = "prodDesc")
    @Mapping(source = "price", target = "prodPrice")
    Product addProductRequestToProduct(AddProductRequest addProductRequest);
}
