package com.ssafy.mini.domain.flag.service;

import com.ssafy.mini.domain.flag.entity.Flag;

public interface FlagService {
    void saveFlag(Flag flag);
    Flag getFlag(String flagUrl);
}
