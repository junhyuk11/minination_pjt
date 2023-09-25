package com.ssafy.mini.domain.shop.service;

import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.domain.shop.dto.request.AddProductRequest;
import com.ssafy.mini.domain.shop.dto.request.DeleteProductRequest;
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
        Member member = getMemberByMemberId(memberId);

        // TODO: QueryDSL로 객체 반환
        List<Product> products = productRepository.findAllByIsoSeq(member.getIsoSeq());

        return products.stream()
                .map(prdocut -> productMapper.productToProductInfoResponse(prdocut))
                .collect(Collectors.toList());
    }

    @Override
    public void addProduct(String memberId, AddProductRequest addProductRequest) {
        log.info("Service Layer::addProduct() called");

        Member member = getMemberByMemberId(memberId);
        isTeacher(member); // 선생님인지 확인

        Product product = productMapper.addProductRequestToProduct(addProductRequest);
        product.setNation(member.getIsoSeq());
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(String memberId, DeleteProductRequest deleteProductRequest) {
        log.info("Service Layer::deleteProduct() called");

        Member member = getMemberByMemberId(memberId);
        isTeacher(member); // 선생님인지 확인

        Product product = getProductByProdName(deleteProductRequest.getProduct());
        productRepository.delete(product);
    }

    /**
     * 회원 아이디로 회원 찾기
     * @param memberId 회원 아이디
     * @return 회원
     */
    private Member getMemberByMemberId(String memberId) {
        return memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));
    }

    /**
     * 선생님인지 확인
     * @param member 회원
     */
    private void isTeacher(Member member) {
        if (!member.getMemType().getCode().equals("MEM01")) {
            throw new MNException(ErrorCode.NO_PERMISSION);
        }
    }

    /**
     * 상품 이름으로 상품 찾기
     * @param prodName 상품 이름
     * @return 상품
     */
    private Product getProductByProdName(String prodName) {
        return productRepository.findByProdName(prodName)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_PRODUCT));
    }

}
