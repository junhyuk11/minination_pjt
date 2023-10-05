package com.ssafy.mini.domain.asset.service;

import com.ssafy.mini.domain.member.entity.Member;

import java.util.Map;

public interface AssetService {

    void setPersonAssetInfo();

    void setNationAssetInfo();

    int myTotalAsset(Member member);
}