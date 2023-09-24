package com.ssafy.mini.domain.shop.service;

import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.domain.shop.dto.request.AddProductRequest;
import com.ssafy.mini.domain.shop.dto.response.ProductInfoResponse;
import com.ssafy.mini.domain.shop.entity.Product;
import com.ssafy.mini.domain.shop.mapper.ProductMapper;
import com.ssafy.mini.domain.shop.repository.ProductRepository;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;

    private final ProductMapper productMapper;

    @Override
    public List<ProductInfoResponse> listProducts(String memberId) {
        log.info("Service Layer::listProducts() called");

        // 회원이 속한 국가 찾기
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        // TODO: QueryDSL로 객체 반환
        List<Product> products = productRepository.findAllByIsoSeq(member.getIsoSeq());

        return products.stream()
                .map(prdocut -> productMapper.productToProductInfoResponse(prdocut))
                .collect(Collectors.toList());
    }

    @Override
    public void addProduct(String memberId, AddProductRequest addProductRequest) {
        log.info("Service Layer::addProduct() called");

        // TODO:이 부분 함수로 빼기
        // 회원이 속한 국가 찾기
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        // TODO:이 부분 함수로 빼기
        // 선생님인지 확인
        if (!member.getMemType().getCode().equals("MEM01")) {
            throw new MNException(ErrorCode.NO_PERMISSION);
        }

        Product product = productMapper.addProductRequestToProduct(addProductRequest);
        productRepository.save(product);
    }


}
