package com.ssafy.mini.domain.shop.controller;

import com.ssafy.mini.domain.shop.dto.request.AddProductRequest;
import com.ssafy.mini.domain.shop.service.ProductService;
import com.ssafy.mini.global.jwt.JwtProvider;
import com.ssafy.mini.global.response.SuccessResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("shop")
@RequiredArgsConstructor
public class ShopController {

    private final ProductService productService;

    private final JwtProvider jwtProvider;

    @GetMapping
    @ApiOperation(value = "구매할 수 있는 물품 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "물품 조회 성공"),
            @ApiResponse(code = 403, message = "유효하지 않은 토큰"),
            @ApiResponse(code = 404, message = "물품 조회 실패")
    })
    public SuccessResponse listProducts(
            @RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken
    ) {
        log.info("Controller Layer::listProducts() called");
        String memberId = jwtProvider.extractMemberId(accessToken);
        return SuccessResponse.builder()
                .data(productService.listProducts(memberId))
                .build();
    }

    @PutMapping
    @ApiOperation(value = "상품 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "물품 추가 성공"),
            @ApiResponse(code = 402, message = "권한 없음"),
            @ApiResponse(code = 403, message = "유효하지 않은 토큰"),
            @ApiResponse(code = 404, message = "물품 추가 실패")
    })
    public SuccessResponse addProduct(
            @RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken,
            @RequestBody @ApiParam(value = "추가할 상품 정보", required = true) AddProductRequest addProductRequest
    ) {
        log.info("Controller Layer::listProducts() called");
        String memberId = jwtProvider.extractMemberId(accessToken);
        productService.addProduct(memberId, addProductRequest);
        return SuccessResponse.builder()
                .build();
    }

}
