package com.ssafy.mini.domain.flag.service;

import com.ssafy.mini.domain.flag.entity.Flag;
import com.ssafy.mini.domain.flag.repository.FlagRepository;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FlagServiceImpl implements FlagService {

    private final FlagRepository flagRepository;

    @Override
    public void saveFlag(Flag flag) {
        flagRepository.save(flag);
    }

    public Flag getFlag(String flagUrl) {
        return flagRepository.findFlagByFlagUrl(flagUrl)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_FLAG));
    }

}
