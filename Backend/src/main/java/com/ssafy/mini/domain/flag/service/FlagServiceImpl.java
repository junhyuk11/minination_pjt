package com.ssafy.mini.domain.flag.service;

import com.ssafy.mini.domain.flag.entity.Flag;
import com.ssafy.mini.domain.flag.repository.FlagRepository;
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

}
